
# Работа с gitlab репозиторием компании aiBox

## Установка соединения с gitlab сервером, на домашнем компе/ноутбуке
Данный раздел применим на машинах без прямого доступа к gitlab.aibox.ailab, например,
на вашем домашнем компьютере или ноутбуке.
1. На своей рабочей/домашней машине установите соединение с SSL-сервером:
``` bash
sudo openconnect --certificate <your_certificate.pfx> \
-b tusken.1c.ru --user=<your_username> --key-password=<your_password>
```
2. Если на вашем домашнем компьютере нет прямого доступа к gitlab.aibox.ailab,
пробросьте 80-й порт gitlab на свой домашний комп через рабочий комп:
``` bash
sudo ssh -fNT -L 80:git.aibox.ailab:80 <your_username>@<your_work_ip>
```
После этого, gitlab репозиторий будет доступен по адресу http://localhost:80

## Клонирование репозитория на домашний комп
Используем http протокол и наш username для клонирования репозитория на
домашний/рабочий компьютер:
Если вы клонируете репозиторий на домашний компьютер:
``` bash
git clone http://127.0.0.1:80/aibox/speechbox.git
```

## Клонирование репозитория на рабочий комп.
Предполагается, что gitlab сервер виден напрямую с рабочего компа.
Тогда клонирование по имени:
```bash
git clone http://gitlab.aibox.ailab/aibox/speechbox.git
```
Теперь на вашем рабочем компе возможен ваш обычный workflow:
``` bash
git pull
git checkout -b <your_work_branch>
#... do work ...
git add <changed_files>
git commit
git checkout develop
git pull
git merge --no-ff <your_work_branch>
git push
```
