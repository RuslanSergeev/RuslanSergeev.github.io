# Конспект рабочего процесса


### Фактически проделанная работа.
1. Большие изменения в speechbox_port/install.sh
2. Рефакторинг CMakeLists.txt
3. Начальная версия проекта под андроид: `Eigen`
4. Сравнение производительности `Eigen` и `nsimd`
5. Миграция на `TensorFlowLite`


### Замораживаем версии пакетов.
Все компоненты заморожены на следующих версиях и
теперь распространяются вместе со `speechbox_port`.
Все зависимости ставятся автоматически из `install.sh`.
1. `boost_1.65_dev`, из deb, ставится скриптом
2. `cmake-3.16.5`, ставится , ставится скриптом.
3. `libeigen3-dev_3.3.4-4_all`, из deb, ставится скриптом
4. `libpulse-dev_1%3a11.1-1ubuntu7.2_amd64`, из deb, ставится скриптом
5. `libzip4_1.1.2-1.1_amd64`, `libzip-dev_1.1.2-1.1_amd64`,
 из deb, ставится скриптом
6. `pybind11-dev_2.0.1-4_all`, из deb, ставится скриптом
7. `libtbb-dev`, `libtbb2`, из deb, ставятся скриптом
8. `cuda-10.1`, `NVIDIA 435` - установщик распространяется вместе с speechbox_port
9. `python3.7.5`, `torch`, `torchvision`, `venv` -   
команды установки прописаны в скрипте. окружение для торч
формируется и прописывается в bashrc.


### Кандидаты на выпил из проекта
1. boost - не нужен в нашем проекте. вхождения заменяются на более
простой код.
2. libtbb - перешли на std::threads. нужно выпилить оставшиеся куски и
удалить эту зависимость из проекта.


### Ошибки во время сборки
1. **При установке `cmake`: не установлен openSSL**
```shell
# добавлено в скрипт
sudo apt install libssl-dev
# Далее ставим тем же скриптом.
```

2. **установка `tbb`: aptitude - команда не найдена**
```shell
#пакеты tbb выкачаны в speechbox_port
#заменено на
sudo dpkg -i libtbb*
sudo apt install -f
```
3. **проблемы с `cuda-10.1`:**
Если уже установлен Nouveau драйвер (дефолтный)
The Nouveau kernel driver is currently in use...
Переконфигурировать initramfs без nouveau
```
sudo touch /etc/modprobe.d/blacklist-nouveau.conf
echo blacklist nouveau > /etc/modprobe.d/blacklist-nouveau.conf
echo options nouveau modeset=0 >> /etc/modprobe.d/blacklist-nouveau.conf
sudo update-initramfs -u
sudo reboot
```

Установить драйверы из скачанного с сайта nvidia run-файла:
```bash
sudo ./cuda_XX.Y.ZZZ_linux.run
```

Если модуль nvidia-drm уже в ядре, отключить его, установить новые  
и вернуть в графический режим:
```bash
#disable graphical mode
systemctl isolate multi-user.target

#At this point, I'd expect you'd be able to unload the Nvidia
#drivers using modprobe -r (or rmmod directly)
modprobe -r nvidia-drm
install drivers #driver installation
#Once you've managed to replace/upgrade it and you're ready
#to start the graphical environment again, you can use this command:
systemctl start graphical.target
```
Поставить собранные драйверы nvidia из ppa-репозитория:
```bash
sudo add-apt-repository ppa:graphics-drivers/ppa #add ppa repository
ubuntu-drivers devices #check available drivers
sudo apt install nvidia-driver-435 #install drivers
sudo reboot #reboot required
```
После успешной установки драйверов необходимо перезагрузить систему и
обновить содержимое `.bashrc`


### Проброс `bash`  
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


### Проброс `Jupyter lab`
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
ssh -N -f -L "$LOCAL_PORT:localhost:$REMOTE_PORT" "$USERNAME@$SERVER_IP"
sleep 0.1
chromium-browser "http://localhost:$LOCAL_PORT" &
```
### Проброс `Atom` и `sshfs`
```shell
#install sshfs
sudo apt install sshfs
```

```shell
#/usr/bin/sshMount.sh
sshfs ruslan@YO.UR.IP.ADD:/home/ruslan /mnt/1c/ruslan/
echo 'now can go to /mnt/1c/ruslan/'
```

### Настройка VNC
[ссылка от Артёма](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-vnc-on-ubuntu-18-04) Пока не проверено, но у Артёма этот вариант  
заработал.

### Планы
 - В скриптах обучения проверять необходимые файлы только перед тем, как они
понадобились. Или в master-скрипте если включена соответствующая стадия.


[Домой](index.html)
