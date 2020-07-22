# Задача добавления сабвордов

## Операции в ручном режиме (пока нет скрипта)

1. Модифицирован скрипт формирования сабвордов.
`~/git/jupyter/subwords/subwords.py`
```bash
python3 subwords.py --config mega_news.conf --pairs 100000
--topn 0.001 --maxlen 200 --extention bigsub
```

3. Строим `словарь фонетических транскриптов` без окончаний **_E**
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
| 200_000 | .titansub | **complete** | no |
| 300_000 | .colossub | **complete** | **colossub_work** | enhanced_colossub.dic


Конфигурационный файл один и тотже, но разные расширения `maga_news.conf`.

[Домой](../index.html)
