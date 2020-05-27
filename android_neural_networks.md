# Ускорение инференс-прохода под андроид

### Возможные подходы к ускорению inference на Android:

1. [NNAPI](https://developer.android.com/ndk/guides/neuralnetworks)
   - Много документации, но в ней сказано, что не нужно трогать  
   NNAPI на уровне приложения, что это может быть сложно.
2. [Pytorch mobile](https://pytorch.org/mobile/home/)
   - Не настолько очевидная документация. Не понятно есть ли API,  
  есть ли делегаты под NPU и прочее железо.
3. [TensorFlowLite](https://www.tensorflow.org/lite/guide?hl=ru)
   - Есть API для android/ios а также делегаты для расчёта  
  на GPU/NNAPI/CortexA60/NPM...

### Что мы выбираем и почему.

Решили остановить выбор на [TensorFlowLite](https://www.tensorflow.org/lite/guide?hl=ru), потому что он из коробки  
поддерживает больше делегатов даже чем NNAPI (включая сам NNAPI как делегат),  
более высокоуровневый API, много документации и примеров.  
Есть документация по C++ API


[Домой](index.md)
