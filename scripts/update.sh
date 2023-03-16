cd /home/ubuntu/chairity-event-leaderboard
sudo pm2 stop server
git reset --hard
git pull
sudo pm2 start server.js --name="server"
