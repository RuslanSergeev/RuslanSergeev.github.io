# Задача добавления сабвордов

## Операции в ручном режиме (пока нет скрипта)

1. Модифицирован скрипт формирования сабвордов.
`~/git/jupyter/subwords/subwords.py`
```bash
python3 subwords.py --config mega_news.conf --pairs 100000
--topn 0.001 --maxlen 200 --extention bigsub
```

Переименовываем полученные текстовые файлы.
Меняем расширение **filename.sub.txt** на **filename.txt**
```bash
ext="sub"
for i in *.txt.$ext ; do mv "$i" "$(basename "$i" .txt."$ext").txt" ; done
```

Строим `словарь фонетических транскриптов` без окончаний **_E**
```bash
cat dict.new | sed 's/_E//' > dict_non_E.dic
```

2. На сформированном в 1. конфиге и `lm-корпусе`` на сабовордах строим lm.bin
при помощи run.py
```bash
python3 run.py --config subs_config.json --stages "make_lm"
```

3. производим `dictionary_enhancement` на словаре без окончаний **_E**
```bash
python3 run.py --config subs_config.json --stages "enhance_dict"
```

4. делаем словарь только из сабвордов:
```bash
python3 subword_dict.py dictionary_nonE.dic phones.bigsub
```

5. Сформированный в шаге 2 `lm.bin` и в шаге 4 обогащённый словарь можно запихивать в
одну `.aibox` модель.
```bash
mkdir ph2500
cp ph2500h.aibox ph2500/
cd ph2500/
unzip ph2500h.aibox
cp subwords_work/model_name.lm.bin ./news.bin
cp subwords_work/model_name.dic ./news.dic
```


## Текущее состояние в ручном режиме:

Решено сделать несколько конфигов и выходных файлов:


| Число сабов | расширение | lm_corpus | lm | dict |  
|---|---|---|---|---|  
| 5_000 | .quantumsub | **complete** | **quantumsub_work** | encanced_quantumsub.dic
| 15_000 | .nanosub |  **complete** | no |
| 20_000 | .microsub | no | no |
| 50_000 | .minisub | **complete** | **minisub_work** | enhanced_minisub.dic
| 70_000 | .regsub | **complete** | no |
| 100_000 | .bigsub | **complete** | **bigsub_work** | enhanced_bigsub.dic
| 100_000 | .watsonsub | ongoing **!!!**| no | no
| 200_000 | .titansub | **complete** | no |
| 300_000 | .colossub | **complete** | **colossub_work** | enhanced_colossub.dic

Конфигурационный файл один и тотже, но разные расширения `maga_news.conf`.

## Результаты тестов с сабвордами


Скрипт для запуска тестирования:
```bash
#script testbench model binpath threads
speechbox/scripts/testing/test_all.sh /data1/tests/8k /data1/models/quantumsub.aibox ../../bin/ 24
```

Результат:

|  | quantumsub | minisub | bigsub | watson | colossub | ph2500h |
|---|---|---|---|---|---|---|
| 8k/1c       | 40.39/18.85 | 47.16/40.28 | 40.56/37.41 | 40.64/37.47 | 39.90/36.72 | 37.71/33.81
| 8k/lamoda   | 40.79/36.23 | 38.39/30.89 | 34.05/29.49 | 34.12/29.54 | 33.51/28.93 | 27.40/21.05
| 8k/mix      | 60.42/58.67 | 58.30/54.15 | 54.38/52.54 | 54.33/52.45 | 53.67/51.79 | 45.84/43.34
| 8k/mts      | 24.17/21.32 | 23.31/15.63 | 11.81/9.83  | 11.89/9.91  | 11.21/9.33  | 9.41/7.46
| 8k/sapunova | 30.15/26.94 | 33.02/24.43 | 23.33/20.27 | 23.38/20.36 | 22.62/19.59 | 20.54/16.92
| 8k/sbrf0    | 44.89/42.25 | 42.17/37.19 | 37.59/34.78 | 37.64/34.82 | 37.23/34.48 | 35.45/32.16
| 8k/sbrf1    | 41.89/39.29 | 38.26/33.91 | 33.88/31.36 | 33.94/31.40 | 33.53/30.95 | 31.65/28.52
| 8k/stelks   | 34.75/30.86 | 34.08/26.96 | 27.79/24.15 | 27.80/24.17 | 27.48/23.87 | 26.07/21.99
| **Summary** | 36.29/33.12 | 35.64/28.79 | 28.36/25.39 | 28.41/25.44 | 27.85/24.91 | 25.59/22.09

Расширение до n-граммах
`sub_fourgram` - 100_000 сабвордов, 4-граммы
`big_sub` - 100_000 сабвордов, 3-граммы
`sherlock` - 100_000 сабвордов, 4-граммы
|  | ph2500h | sub_fourgram | sherlock | bigsub |
|---|---|---|---|---|
| 8k/1c       | 37.71/33.81 | 40.08/36.94   | 43.12/38.45 |  40.56/37.41  
| 8k/lamoda   | 27.40/21.05 | 33.83/29.03   | 33.30/27.72 |  34.05/29.49  
| 8k/mix      | 45.84/43.34 | 54.19/52.07   | 49.85/46.98 |  54.38/52.54  
| 8k/mts      | 9.41/7.46   | **8.19/6.67** | 14.61/11.38 |  11.81/9.83   
| 8k/sapunova | 20.54/16.92 | 23.54/20.27   | 26.50/21.20 |  23.33/20.27  
| 8k/sbrf0    | 35.45/32.16 | 37.63/34.79   | 38.44/34.77 |  37.59/34.78  
| 8k/sbrf1    | 31.65/28.52 | 33.87/31.16   | 36.17/32.46 |  33.88/31.36  
| 8k/stelks   | 26.07/21.99 | 27.81/23.91   | 28.46/23.93 |  27.79/24.15  
| **Summary** | 25.59/22.09 | 27.76/24.72   | 30.01/25.71 |  28.36/25.39  
```
wer/werc total = 29.98/25.69 -
шерлок, с дополненным словарём. Не только сабворды, но и исходные слова.
```
[Домой](../index.html)
