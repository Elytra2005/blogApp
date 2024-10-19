from flask import Flask, request, redirect, url_for
import json
import os
import random

app = Flask(__name__)

@app.route("/posts", methods=["GET", "POST"])
def handle_post() :
    jsonPath = os.path.join("static", "blogData.json")

    if request.method == "POST":
        # form elements
        postData = request.form['blog-entry']
        nameData = request.form["name-entry"]
        dateData = request.form["date-entry"]
        titleData = request.form['title-entry']
  
        randDomid = random.randint(0, 100)
        newEntry = {
            "Name": nameData,
            "Date": dateData,
            "Blog-Text": postData,
            "title-Text": titleData,
            "removal-id": randDomid,  
        }

        listData = []
        if os.path.exists(jsonPath):
            with open(jsonPath, "r") as blogData:  # Read current data
                listData = json.load(blogData)

        # Check for duplicates based on consistent fields (without removal-id)
        if any(post['Name'] == newEntry['Name'] and 
               post['Date'] == newEntry['Date'] and 
               post['Blog-Text'] == newEntry['Blog-Text'] for post in listData):
            print("Post already exists!")
            return redirect(url_for("work"))

        # If not a duplicate, append the new entry
        listData.append(newEntry)

        with open(jsonPath, "w") as blogData:
            json.dump(listData, blogData, indent=4)


    else:
        # Handle GET requests (or other methods if needed)
        return "Form not submitted!"

@app.route("/posts")
def work():
    return "Form submitted successfully!"

