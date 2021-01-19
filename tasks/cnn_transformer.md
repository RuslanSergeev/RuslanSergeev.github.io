# Применение архитектур `transformer` и `cnn` в задачах распознавания речи

## Transformer.
Основано на архитектуре `attention`. Имеет ряд проблем.
Метод описан тут:
1. [оригинальная работа, Transformer. ArXiv](https://arxiv.org/abs/1706.03762)
2. [упрощено и разжёвано, Transformer. github](http://jalammar.github.io/illustrated-transformer/)
3. [простой attention для MT, Attention, ArXiv](https://arxiv.org/pdf/1508.04025.pdf)
4. [Bahdanau et al., attention. Лучшая работа.](https://arxiv.org/pdf/1409.0473.pdf)

Метод `transformer` невозможно из коробки применить к задачам распознавания речи,
проблемы описаны в компиляции ниже:
1. [основная подборка с проблемами Transformer в ASR](https://desh2608.github.io/2020-01-08-transformer-asr/)


Выводы по результатам применения:

1. [A TIME-RESTRICTED SELF-ATTENTION LAYER FOR ASR, 2018](https://www.danielpovey.com/files/2018_icassp_attention.pdf)
WER лучше чем у LSTM на 0.6. Заменён один выходной слой.
2. [TRANSFORMER-TRANSDUCER:END-TO-END, 2019](https://arxiv.org/pdf/1910.12977.pdf)
WER улучшился на 0.7% на `test-clean` и на 3% на `test-other`. Размер модели всего **47M**,
возможно применение stream-режима. При сохранении стрим-режима, остаётся лучше, чем
аналогичная `BiLSTM-сеть`!
Архитектура не просто `transformer` а `transformer-transducer`.
3. [Self-Attentional Acoustic Models](https://arxiv.org/pdf/1803.09519.pdf)
Сравнили с базовой lstm-моделью. LSTM оказалась на 2% сильнее.


## CNN в задаче ASR

1. [ATTENTION-BASED WAV2TEXT WITH FEATURE TRANSFER LAndros TjandraEARNING, 2017](https://arxiv.org/pdf/1709.07814.pdf)
6.54 CER
  1.1 [Архитектура NIN-сетей](https://arxiv.org/pdf/1312.4400.pdf)

2. [Abdel-Hamid et al., 2014](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/CNN_ASLPTrans2-14.pdf)
Самая частая статья в google. ~= 20% PER

3. [facebook wav2letter, 2017](https://openreview.net/pdf?id=BkUDvt5gg)

4. [Sequence-to-Sequence Speech Recognition withTime-Depth Separable Convolutions](https://arxiv.org/pdf/1904.02619.pdf)
3.18 WER

5. [facebook wav2vec](https://research.fb.com/wp-content/uploads/2019/09/WAV2VEC-UNSUPERVISED-PRE-TRAINING-FOR-SPEECH-RECOGNITION-v2.pdf)
Обучение без учителя. Претрейнинг для улучшения результата.

## Поиск кода

1. [классификация звуков и MFCC](https://github.com/GorillaBus/urban-audio-classifier)
Много примеров по классификации UrbanSounds, но немного не то.
