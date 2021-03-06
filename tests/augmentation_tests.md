# Тестирование устойчивости обучения при аугментации датасета.

## Изменяемые для аугментации параметры
- `tdrop`: 0.1
вероятность "выбить" фичу во времени
- `fdrop`: 0.1
вероятность "выбить" фичу по частоте
- `aug`: 0.3...0.5
вероятность аугментации данных


## Улучшение устойчивости
В ходе работы с аугментацией могут появляться NaN-ы.
Для предотвращения такого поведения можно установить
дополнительные параметры:
- `wdecay`: 0.01
изменение значения коэффициента обучения от времени,
может быть вектором, например [0.1, 0.1, 0.01].
- `clip`: 1000
Ограничение модуля вектора градиента.


## Результаты тестирования
|tdrop|fdrop|aug|wdecay|clip|результат|  
|---|---|---|---|---|---|  
|0.1|0.1|0.5|0.0|0.0|не обучается, `NaN` сразу|  
|0.1|0.1|0.5|0.0|1000|не обучается, `NaN` на 6й эпохе|  
|0.1|0.1|0.3|0.01|1000|обучилось, но WER/WERC=100/100.|  
Исправлено:
В последнем тесте была найдена 2я эпоха как лучшая, был отображён результат, которого
я не видел в процессе обучения (скрипты выбрали абсолютно левый файл.)

[Домой](index.html)
