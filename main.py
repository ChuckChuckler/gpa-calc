from flask import Flask, json, jsonify, render_template, request
import hashlib
import sqlite3

app = Flask(__name__, template_folder="templates", static_folder="static")

usern=""
passw=""
passw2=""

@app.route("/", methods=["GET", "POST"])
def index():
  global usern
  global passw
  global passw2
  message=""
  if request.method == "POST" and request.form.get("username1"):
    usern = request.form.get("username1")
    passw = request.form.get("password1")
    conn = sqlite3.connect("logininfo.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS userdata(username, password, classes)")
    passw2 = bytes(str(passw), encoding="utf-8")
    classes = json.dumps([["", "basic", "", "0"]])
    cur.execute(
        "INSERT INTO userdata VALUES (?, ?, ?)",
        (usern, hashlib.sha256(passw2, usedforsecurity=True).hexdigest(), classes))
    print("Account was created!")
    conn.commit()
    conn.close()
    message = "Account created! Log in with your newly-created username and password!"
    return render_template("index.html", message=message)
  elif request.method == "POST" and request.form.get("username2"):
    usern = request.form.get("username2")
    passw = request.form.get("password2")
    passw2 = hashlib.sha256(bytes(str(passw), encoding="utf-8"), usedforsecurity=True).hexdigest()
    conn = sqlite3.connect("logininfo.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS userdata(username, password, classes)")
    if (usern,) not in cur.execute("SELECT username FROM userdata"):
      message = "Username does not exist."
      return render_template("index.html", message=message)
    elif (
        usern,
        passw2) not in cur.execute("SELECT username, password FROM userdata"):
      message = "Incorrect password."
      return render_template("index.html", message=message)
    else:
      print("Logged in with username " + str(usern) + " and password " + str(passw))
      classesfetched = json.loads(cur.execute("SELECT classes FROM userdata WHERE (username, password)=(?,?)", (usern, passw2)).fetchone()[0])
      print(classesfetched)
      conn.close()
      return render_template("main.html", usern=usern, classesfetched=classesfetched)
  return render_template("index.html", message=message)

@app.route("/process", methods=["POST"])
def process():
  global usern
  global passw
  global passw2
  if not request.json:
    print("No json found")
    return jsonify({"message": "Arr NOT recieved!!!!"})
  elif "data" not in request.json:
    print("Data not in json")
    return jsonify({"message": "Arr NOT recieved!!!!"})
  else:
    arr = json.dumps(request.json["data"])
    print("Data: ", arr)

    conn = sqlite3.connect("logininfo.db")
    cur = conn.cursor()
    cur.execute("UPDATE userdata SET classes=? WHERE (username, password) = (?,?)", (arr, usern, passw2))
    conn.commit()
    print("After saving: ")
    classesfetched = json.loads(cur.execute("SELECT classes FROM userdata WHERE (username, password)=(?,?)", (usern, passw2)).fetchone()[0])
    print(classesfetched[0])
    conn.close()
    return jsonify({"message": "Arr recieved!!!!"})

app.run(host='0.0.0.0', port=8080, debug=True)
