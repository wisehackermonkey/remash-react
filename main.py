"""
remash live book editor

wisemonkey
oranbusiness@gmail.com
20190106
github.com/wisehackermonkey

NOT WORKING ANYMORE due to flask_socketio bug
bug is descripbed here 
https://stackoverflow.com/questions/53522052/flask-app-valueerror-signal-only-works-in-main-thread
run app in windows
set FLASK_APP=main.py
set FLASK_ENV=development
flask run

run server
>python main.py


docs for flask-socketio 
https://flask-socketio.readthedocs.io/en/latest/

tutorial for use of flask and socket.io together
https://codeburst.io/building-your-first-chat-application-using-flask-in-7-minutes-f98de4adfa5d
"""
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

test_string = "wow it works look mom no hands!"

@app.route("/")
def index():
    return render_template("index.html")


def messageReceived():
    print('Message was received')

@socketio.on('text')
def handle_text(text, methods=['GET', 'POST']):
    test_string = text
    print(f"=======> handle_text(): {text}")
    print('received "text" event: ' + str(text))
    socketio.emit('sync', text, callback=messageReceived)

@socketio.on("connected")
def sync_client_on_load():
    print("=======> sync_client_on_load()" )
    socketio.emit("sync", test_string)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", debug=True, port=8080)