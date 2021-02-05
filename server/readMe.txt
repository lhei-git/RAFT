pip list - get all pip dependencies installed on virtual env
pip freeze - get version numbers of pip stuff
deactivate - deactivates the virtual env
pip freeze > requirements.txt - creates a req file
Windows 10: 
.\<env-name>\Scripts\activate.bat
- to activate the virtual env 

# install all required libraries
pip install -r requirements.txt



# Process to recreate the environment:
- python -m venv env
- .\env\Scripts\activate.bat (Windows 10)
- pip install -r requirements.txt