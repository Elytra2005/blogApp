from flask import Flask, render_template, request
from app import handle_post

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])

def work():
   handle_post() 
   return render_template("index.html")

    
    
if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)

