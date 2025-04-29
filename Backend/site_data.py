"""
site_data.py
Script pentru descărcarea și extragerea valorilor Indicelui Prețului Bunurilor Imobile Rezidențiale (RPPI)
de pe site-ul BNM, pe trimestre și ani specificați, și salvarea rezultatelor într-un fișier JSON.
"""
import requests
from bs4 import BeautifulSoup
import re
import json
import sys
from datetime import datetime
# years and trimesters to process
YEARS = [2020,2021,2022, 2023, 2024]
QUARTERS = ["1st", "2nd", "3rd", "4th"]
BASE_URL = "https://www.bnm.md/en/content/residential-property-price-index-rppi"
#extracting percents
PERCENT_PATTERN = re.compile(r"(\d+\.\d+)\s*percent")
OUTPUT_JSON = "rppi_data.json"
def build_urls(years, quarters):
    """
    Generează lista de URL-uri RPPI pentru fiecare combinație (an, trimestru).
    """
    urls = []
    for year in years:
        for q in quarters:
            # ex: https://www.bnm.md/en/content/residential-property-price-index-rppi-1st-quarter-2024
            url = f"{BASE_URL}-{q}-quarter-{year}"
            urls.append((year, q, url))
    return urls
def scrape_page(year, quarter, url):
    """
    Descarcă și extrage valorile RPPI de pe pagina dată.
    Returnează un dicționar cu datele sau None dacă nu s-a găsit tot setul de valori.
    """
    try:
        resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"[{year} {quarter}] EROARE HTTP: {e}", file=sys.stderr)
        return None

    # Parse HTML
    soup = BeautifulSoup(resp.text, "html.parser")
    # Concatenăm textul tuturor paragrafelor pentru că acolo apar procentele
    text = " ".join(p.get_text() for p in soup.find_all("p"))

    # Căutăm toate aparițiile de "număr.percent"
    matches = PERCENT_PATTERN.findall(text)
    if len(matches) < 3:
        print(f"[{year} {quarter}] ATENȚIE: găsite doar {len(matches)} valori procentuale", file=sys.stderr)
        return None

    # Primele trei valori sunt: total, piața primară, piața secundară
    total_pct = float(matches[0])
    primary_pct = float(matches[1])
    secondary_pct = float(matches[2])

    return {
        "date": f"{quarter} quarter {year}",
        "rppi_total": total_pct,
        "rppi_primary": primary_pct,
        "rppi_secondary": secondary_pct
    }
def main():
    # Construim lista de URL-uri
    tasks = build_urls(YEARS, QUARTERS)

    results = []
    for year, quarter, url in tasks:
        record = scrape_page(year, quarter, url)
        if record:
            results.append(record)

    # Adăugăm timestamp de generare
    output = {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "data": results
    }

    # Salvăm fișierul JSON
    try:
        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print(f"Salvat cu succes în '{OUTPUT_JSON}' ({len(results)} înregistrări).")
    except IOError as e:
        print(f"Eroare la salvarea JSON: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
