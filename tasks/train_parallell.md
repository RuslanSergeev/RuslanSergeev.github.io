# Задача дообучения параллельно
Пайплайн параллелится. Русский обучается одновременно с другим языком.

## Схема

![Схема](https://yuml.me/diagram/scruffy/class/[Iterator1]-%3Eget_data[lstm%201],%20[Iterator2]-%3Eget_data[lstm%202],%20[lstm%201]-%3E[lstm],%20[lstm%202]-%3E[lstm],%20[lstm%201]-[note:%20Layers=2,%20neurons=100,%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%B4%D1%81%D0%B5%D1%82%D1%8C],%20[lstm%202]-[note:%20Layers=2,%20neurons=100,%20%D0%90%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%B4%D1%81%D0%B5%D1%82%D1%8C],%20[lstm]-%3E[log_softmax],%20[log_softmax]-[note:%20Layers=2,%20neurons=100,%20%D0%9E%D0%B1%D1%89%D1%8F%D1%8F%20%D1%81%D0%B5%D1%82%D0%BA%D0%B0])

## Ближайшие дела по задаче
- [x] Игорь добавляет исходники в dev
- [x] В config.json у датасетов появляется новая роль: `train_ext`
- [x] Если есть датасеты с такой ролью, то создаётся ещё один итератор
для этого вида датасетов. Этот итератор передаётся конструктору ASR в `tnn_train`
- [ ] cms-init вектор в json писать с точностью 3 знака и в несколько строк.

## Тесты

|layers|neurons|cascade|Wer/Werc|Per/Perc|  
|---|---|---|---|---|  
|2+2|100|True|52.8923/48.2478|30.7993/22.0913|
|4|100|False|73.4679/70.7782|50.6357/40.1321|
В тесте участвовало 25670 файлов

## Дополнительно при каскаде:
Размер модели: 491877К
```
[2020-06-27 00:05:55] SpeechBox: INFO: TERRORS	125780
[2020-06-27 00:05:55] SpeechBox: INFO: ALL WORDS	260696
[2020-06-27 00:05:55] SpeechBox: INFO: PH_ERRORS	438760
[2020-06-27 00:05:55] SpeechBox: INFO: PH_TERRORS	314708
[2020-06-27 00:05:55] SpeechBox: INFO: ALL PHONES	1424576
[2020-06-27 00:05:55] SpeechBox: INFO: Memory using: 2751 MB; 2.68652 GB
```

Дополнительно при не-каскаде
```
[2020-06-27 01:32:16] SpeechBox: INFO: ERRORS	239410
[2020-06-27 01:32:16] SpeechBox: INFO: TERRORS	230645
[2020-06-27 01:32:16] SpeechBox: INFO: ALL WORDS	325870
[2020-06-27 01:32:16] SpeechBox: INFO: PH_ERRORS	901680
[2020-06-27 01:32:16] SpeechBox: INFO: PH_TERRORS	714640
[2020-06-27 01:32:16] SpeechBox: INFO: ALL PHONES	1780720
[2020-06-27 01:32:16] SpeechBox: INFO: Memory using: 2728 MB; 2.66406 GB
```


[Домой](../index.html)
