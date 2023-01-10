sudo apt-get update
sudo apt-get upgrade -y
ssh-keygen -t ed25519 -C "your@email.com"
cat .ssh/id_ed25519.pub
  # Copy ssh key and paste to github
git clone --depth=1 git@github.com:ADIBzTER/open-pantau-server.git pantau-server
wget https://nodejs.org/dist/v16.10.0/node-v16.10.0-linux-x64.tar.xz
sudo tar -xvf node-v16.10.0-linux-x64.tar.xz --directory /usr/local --strip-components 1
rm node-v16.10.0-linux-x64.tar.xz
npm install -g npm@latest
npm --prefix pantau-server i pantau-server

# Install FFMPEG
sudo apt-get install ffmpeg -y

# Configure firewall
sudo apt-get install ufw
ufw default allow outgoing
ufw enable
ufw allow 22/tcp # SSH
ufw allow 80/tcp # Web server
ufw allow 10000/tcp # RTMP server
ufw allow 8000/tcp # Media server

# Setup SSL
sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo snap set certbot trust-plugin-with-root=ok
sudo snap install certbot-dns-cloudflare
certbot certonly --dns-cloudflare --dns-cloudflare-credentials secrets/cloudflare.ini -d your.domain

# PM2
sudo npm install pm2 -g
pm2 start pantau-server/server.js