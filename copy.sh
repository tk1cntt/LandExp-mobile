#yarn run webpack:build
rsync -e "ssh -i ~/Downloads/ServerKey.pem" --rsync-path="sudo rsync" -avz build/ ec2-user@54.179.162.103:/var/www/m.tinvang.com.vn/
