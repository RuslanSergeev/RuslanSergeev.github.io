#Конспект по организации удалённой работы
----

# Проброс `bash`  
Запуск OpenSSL сессии:
```bash
#/usr/bin/sshStart.sh
sudo openconnect --certificate /opt/Sergeev_R@Dept07.pfx \
-b tusken.1c.ru --user=$USERNAME --key-password=$PASSWORD_FROM_MAIL
```
Запуск ssh:
```bash
##/usr/bin/sshConnect.sh
ssh ruslan@YO.UR.IP.ADD
```


# Проброс `Jupyter lab`
Конфигурация пароля на сервере:
```bash
jupyter-notebook --generate-config
jupyter-notebook password
```
Скрипт для запуска на сервере:
```bash
#/usr/bin/startJupyter.sh
nohup jupyter lab --port=9000 --no-browser &
```
Скрипт для запуска на домашней машине:
```bash
#/usr/bin/sshJupyter.sh
REMOTE_PORT=9000
LOCAL_PORT=8888
USER_NAME=ruslan
SERVER_IP="YO.UR.IP.ADD"

echo "port forwarding..."
sshpass -p "$USER_PASS" ssh -o StrictHostKeyChecking=no -N -f -L  "$LOCAL_PORT:localhost:$REMOTE_PORT" "$USERNAME@$SERVER_IP"
sleep 0.1
chromium-browser "http://localhost:$LOCAL_PORT" &
```
Скрипт для остановки или перезагрузки `Jupyter` проброшенного через `ssh`
```
pkill -f "ssh.*localhost:$REMOTE_PORT"
```

# Проброс `Atom` и `sshfs`
```shell
#install sshfs
sudo apt install sshfs
```

```shell
#/usr/bin/sshMount.sh
sshfs ruslan@YO.UR.IP.ADD:/home/ruslan /mnt/1c/ruslan/
echo 'now can go to /mnt/1c/ruslan/'
```

# Настройка VNC

**Инструкция по запуску на сервере:**
[ссылка в сети](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-vnc-on-ubuntu-18-04)

**На стороне клиента** : поставить клиент и запустить его:
```shell
sudo apt install xtightvncviewer
```
Пробросить порты чтобы пакеты шли через ssh, по умолчанию VNC не обеспечивает
шифрования и безопасности.
```shell
#with no @ sign
ssh -L 5901:localhost:5901 -C -N -l $USERNAME $REMOTE_IP
```
В качестве клиента для доступа к `vnc`-серверу можно использовать `vinagre`.

# Настройка VPN
[Оригинальная инструкция](https://www.cyberciti.biz/faq/howto-setup-openvpn-server-on-ubuntu-linux-14-04-or-16-04-lts/)

**Получить публичный IP на стороне клиента и сервера:**
```shell
host myip.opendns.com resolver1.opendns.com
```
На выходе получим 2 IP адреса, которые необходимо сохранить.

Загрузить скрипт для загрузки `openvpn`
```shell
wget https://git.io/vpn -O openvpn-install.sh
```
Предоставляем данные по умолчанию:
**Адрес**: какой предложит скрипт.
**Порт**: какой предложит (1194)

После запуска **openvpn-install.sh** создаёт конфиг-файл.
**/home/ruslan/AsusHome.ovpn**.
AsusHome - имя клиента которое мы указали.
Этот конфигурационный файл необходимо передать клиенту.

А также конфиг сервера:
**/etc/openvpn/server/server.conf**


# Профилирование `seedscope`

[Страница проекта](https://github.com/jlfwong/speedscope#usage)

Можно поставить `speedscope.app` локально, для последующего простмотра логов
выполнения. А можно загружать на [speedscope.app](speedscope.app)
Сначала добавляем репозиторий `nodejs` и ставим `speedscope`
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install npm
sudo npm install speedscope
```

Ставим пакет `pyspeedscope`
```bash
python3 -m pip install --upgrade pip
python3 -m pip install pyspeedscope
```

Используем `pyspeedscope` в своих скриптах.
```python
import pyspeedscope
with speedscope.track('logname.json'):
        slow_method()
```

Далее можно смотреть в офлайне в удобном браузере:
```bash
speedscope logname.json
```

Можно также генерить логи для `speedscope` из [py-spy](https://pypi.org/project/py-spy/)
подключаясь к уже выполняющимся процессам.


[Домой](index.html)
