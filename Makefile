deploy:
	ansible-playbook -i host.ini deploy.yml --ask-vault-pass