# Simple-Jumping-Game-Using-HTML-CSS-JS
This game runs on Node server (localhost:3000).
This game uses MySql to store game scores, you have to edit the db name, username password in the app.js 

<h2>Installation</h2>
<ul>
<li>Download the project</li>
<li>cd the game's path on cmd</li>
<li><code>npm install</code> to install all dependencies</li>
<li>Open "app.js" and edit the varibles called <br>username password dbname server</br>`User name,password,server, database name of mysql</li>
<li><code>node app</code> to turn on the server</li>
<li>Search "localhost:3000" in a browser to run the game</li>

<h2> This game saves user data on mysql database</h2>
<h3>Edit app.js with appropirate database credentials</h3>
<h3>Create a table "players" with following properties:</h3>
+----------+-------------+------+-----+---------+-------+<br>
| Field    | Type        | Null | Key | Default | Extra |<br>
+----------+-------------+------+-----+---------+-------+<br>
| name     | varchar(20) | YES  |     | NULL    |       |<br>
| password | varchar(20) | YES  |     | NULL    |       |<br>
| score    | int         | YES  |     | NULL    |       |<br>
+----------+-------------+------+-----+---------+-------+<br>
</ul>
<h2>Game instructions</h2>
press "c" to start the game
Press "spacebar" or "mouse left click" to jump
Press "x" to use "invisible ability" while the big block tries to hit you
press "s" to activate super power(available if you have 20 points from last super power used and lasts for 5 seconds)
If you have super power available the player color changes to rose
press "p" to pause game

<a href="https://youtu.be/3UGwnw-BXYk">Video demonstration of this game</a>
<h3>Hope You enjoyed the game</h3>
