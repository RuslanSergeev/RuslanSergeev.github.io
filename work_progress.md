# Конспект рабочего процесса


# Фактически проделанная работа.
1. Большие изменения в speechbox_port/install.sh
2. Рефакторинг CMakeLists.txt
3. Начальная версия проекта под андроид: `Eigen`
4. Сравнение производительности `Eigen` и `nsimd`
5. Миграция на `TensorFlowLite`


# Замораживаем версии пакетов.
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


# Кандидаты на выпил из проекта
1. boost - не нужен в нашем проекте. вхождения заменяются на более
простой код.
2. libtbb - перешли на std::threads. нужно выпилить оставшиеся куски и
удалить эту зависимость из проекта.


# Ошибки во время сборки
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
```shell
sudo touch /etc/modprobe.d/blacklist-nouveau.conf
echo blacklist nouveau > /etc/modprobe.d/blacklist-nouveau.conf
echo options nouveau modeset=0 >> /etc/modprobe.d/blacklist-nouveau.conf
sudo update-initramfs -u
sudo reboot
```

Если ранее был установлен cuda-набор из .run-файла, его необходимо удалить
```bash
#To uninstall the CUDA Toolkit, run cuda-uninstaller in 
/usr/local/cuda-10.2/bin
#To uninstall the NVIDIA Driver, run 
nvidia-uninstall
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

# Проблемы с клавиатурой
Если после обновления драйвера возникли проблемы с клавиатурой и
мышью, помогает установка:
```bash
sudo apt-get install xserver-xorg-input-all
```

# Компоненты при установке пакетным менеджером.
```bash
sudo apt install cuda-cudart-10-2* cuda-cudart-dev-10-2* cuda-cufft-10-2* cuda-cupti-10-2* cuda-curand-10-2*
cuda-cusolver-10-2* cuda-cusparse-10-2* cuda-npp-10-2* cuda-nvcc-10-2* cuda-nvgraph-10-2*
cuda-nvjpeg-10-2* cuda-nvprof-10-2* cuda-nvrtc-10-2* cuda-nvtx-10-2* cuda-repo-ubuntu1804*
cuda-repo-ubuntu1804-11-0-local* cuda-sanitizer-api-10-2* cuda-toolkit-10-2*
cuda-visual-tools-10-2*
```

Компоненты `nvidia-drivers` для установки. (необходимо выбрать одну версию, 435)
```bash
ii  libnvidia-common-435                       435.21-0ubuntu0.18.04.2                             all          Shared files used by the NVIDIA libraries
rc  libnvidia-compute-435:amd64                435.21-0ubuntu0.18.04.2                             amd64        NVIDIA libcompute package
ii  libnvidia-compute-435:i386                 435.21-0ubuntu0.18.04.2                             i386         NVIDIA libcompute package
rc  nvidia-compute-utils-435                   435.21-0ubuntu0.18.04.2                             amd64        NVIDIA compute utilities
rc  nvidia-dkms-435                            435.21-0ubuntu0.18.04.2                             amd64        NVIDIA DKMS package
ii  nvidia-kernel-common-435       435.21-0ubuntu0.18.04.2                             amd64        Shared files used with the kernel module
ii  nvidia-prime        0.8.8           all        Tools to enable NVIDIA's Prime
```

Также необходимо удалить `nouveau` из  `/etc/modules`

[Домой](index.html)
