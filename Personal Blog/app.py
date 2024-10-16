from flask import Flask, request, redirect, url_for
import json
import os

app = Flask(__name__)

@app.route("/posts", methods=["GET", "POST"])
def post():
    jsonPath = os.path.join("static", "blogData.json")

    if request.method == "POST":
        # form elements
        postData = request.form['blog-entry']
        nameData = request.form["name-entry"]
        dateData = request.form["date-entry"]
        titleData = request.form['title-entry']

     
        newEntry = {
            "Name": nameData,
            "Date": dateData,
            "Blog-Text": postData,
            'title-Text': titleData,
        }

        
        listData = []
        if os.path.exists(jsonPath):
            with open(jsonPath, "r") as blogData:  # Read the current data
                listData = json.load(blogData)

    
        if newEntry not in listData:
            listData.append(newEntry) 

          
            with open(jsonPath, "w") as blogData:
                json.dump(listData, blogData, indent=4)  

        return redirect(url_for('work'))

    else:
        # Handle GET requests (or other methods if needed)
        return "Form not submitted!"

@app.route("/work")
def work():
    return "Form submitted successfully!"

