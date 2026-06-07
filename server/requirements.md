# Hey there!

### To activate the backend server, follow these steps:

1. Set up the virtual environment:

- To run the server, you'll need to set up a virtual environment.
- Ensure you have python installed
- cd into the "server" folder in the root directory and run this command:

  Windows:

  ```
  python -m venv venv
  venv\Scripts\activate
  ```

  MacOS:

  ```
  python3 -m venv venv
  source venv\bin\activate
  ```

2. Install dependencies:

- To install the required packages, simply run this command:
  ```
  pip install -r requirements.txt
  ```

3. Run the server:

- Now you're ready to run the server. Use this command to start the server:

  ```
  uvicorn main:app --reload
  ```

### Enjoy the app!
