# Решение задачи дообогащения словаря

## Постановка задачи
- [x] Добавить unhyphen фильтр. Он уже написан, но не встроен в enhance_dict.py
- [x] Необходимо неизменённые атрансы из аккустического корпуса подать на вход
в языковую модель, пути уже предусмотрены в секции `generated`
- [x] Необходимо дообогатить `unknown` из юниграмм, сгенерированных языковой
моделью, некириллические символы выфильтровать.
```python
self.paths['generated'] = {
#атрансы из аккустики, должны попасть в lm
'amlm utterances' : self.work_dir+'/amlm.utts'
#юниграммы из lm, должны попасть в unknown,
#возможно с английскими словами
'lm unigrams'     : self.work_dir+'/unigrams.dict'
# ...
}
```
- [x] Необходимо добавить файлы аббревиатур, транслитераций английских слов и
именованных сущностей в `unknown`
```json
{
  /* ... какие-то пути*/
  /* аббревиатуры, не интересуют ? Или тоже добавить в unknown */
  "lm_abbrs_path": "/data1/lm_corpus/dicts/abbrs.txt",
  /* Транслиты с английского на русский должны попасть в unknown */
  "ext_words_path": "/data1/other_files/ext_dict.txt",
  /* Именованные сущности должны попасть в unknown */
  "lm_named_entities_path": "/data1/lm_corpus/dicts/named_entities.txt",
  /* ... остальные пути*/
}
```

- [x] Необходимо добавить транскрипты для английских слов из файла транскриптов
в фонетический словарь:
```
1. Из файла транскриптов (ext_words_path) кирилические транскрипты добавить в unknown
2. вызвать g2p, получить фонетические транскрипты для транслитов.
3. Найти соответствие исходных английских слов (ext_words_path) их фонетическим
транскриптам и добавить в фонетический словарь (paths.dictionary_path)
```
- [x] Проверить, что make_data работает с нужным словарём. Сейчас берётся старый словарь.
- [x] Проверить, что в итоговую модель кладётся словарь с транслитами. Не нашёл их там.
- [x] Необходимо отладить новые механизмы, проверить правильность работы.
- [ ] Перегенерить модель с новым словарём, на 1000.000 слов
- [ ] cms-init вектор в json писать с точностью 3 знака и в несколько строк.

## Примеры файлов
*amlm utterances*
```
предложение 1
предложение 2
...
предложение N
```
*lm unigrams*
```
слово
другое-слово
english-слово
```
*lm_abbrs_path*
```
РСФСР
ЛДПР
КНДР
...
```
*ext_words_path*
```
CocaCola  Кокакола
iPad  айпэд
```
*lm_named_entities_path*
```
Российская Федерация
Солнце
Москва
...
```


[Домой](../index.html)