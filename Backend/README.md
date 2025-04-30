### To Be Implemented
- Mortgage Calculator
- Profit Predictor

### How to build

To build the backend/api of the project you can use **make**  

```bash
make
```

### To Run

You can just run the executable after build.

**Note**: makefile is only limited for linux at the moment. If you still want to run without any linux virtual machine you can use docker

### How to Docker

If you have docker installed clone the repo then:

```bash
cd Backend
docker build -t test-server .
docker run -d -p 5000:5000 test-server
```

The api by default runs on port :5000 

### Dependencies Used
[CWebStudio](https://github.com/OUIsolutions/CWebStudio/tree/main?tab=readme-ov-file)
