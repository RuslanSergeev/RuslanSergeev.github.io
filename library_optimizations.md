# Заметки по оптимизации

1. Поставил тулчейн для арм
```shell
sudo apt install binutils-aarch64-linux-gnu
```

2. Дизассемблирование
```shell
unzip release.apk
aarch64-linux-gnu-objdump -S libnative-lib.so > native_disasm.s
```
3. Поставил и потестил библиотеку **nsimd**

# Заметки по nsimd

<div align="center">
<br><br><br>
<a href="index.md">Домой</a>
</div>
