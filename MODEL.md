
### In and out data

```json 
"Input" : {
	"House Number" : int,
	"Houses" : [
		{
			"Money Available": int,
			"House Price": int,
			"Tax Rate": int,
			"Yearly Effective Tax Rate": int,
			"Term": int
		},
		{
			\...
		}
	]
}
,
"Out": {
	"Monthly Payment": int,
	"Yearly Payment": int,
	"Money Enough": bool,
	"Repayment Time": int,
	"Profit Rate": int,
	"Repayment Graph": int[],
	"Risk Rate" : int
}
```

This the rough representation of the data that will be working with.
