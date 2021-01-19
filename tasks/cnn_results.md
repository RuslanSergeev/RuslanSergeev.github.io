###LSTM 2layers 2directions 250neurons
test и train использовали одни и те же параметры итератора
train accuracy:  100.0%
test accuracy:  84.27433473389357%

###CNN+LSTM+mean+CrossEntropyLoss + aug
`cnn_lstm_mean_cross.py`
train accuracy:  86.42272963645819%
test accuracy:  86.2116991643454%

###CNN+LSTM+mean+NLL + aug
train accuracy:  77.22308892355694%
test accuracy:  79.43361188486537%

###CNN+max
train accuracy:  96.2754909365559%
test accuracy:  85.26785714285714%

###CNN+RNN+max +CrossEntropyLoss noaug
train accuracy:  100.0%
test accuracy:  88.34908963585433%

###CNN+RNN+mean+CrossEntropyLoss noaug
train accuracy:  93.04117619250225%
test accuracy:  84.58681522748375%

###CNN+RNN+mean+CrossEntropyLoss + aug
`cnn_rnn_mean_cross.py`
train accuracy: 89.22164180868414%
test accuracy:  86.44697145509399%

###CNN+RNN+mean+NLLLoss + aug
`cnn_rnn_mean_nll.py`
train accuracy:  84.48483702460585%
test accuracy:  85.86679043861685%

###CNN+RNN+max+NLLLoss + aug
86.8319663412674%
86.0988628452077%

###CNN+LSTM+mean+CrossEntropyLoss + aug


###CNN+LSTM+max
train accuracy:  99.99527945619336%
test accuracy:  88.67078081232492%

###CNN+LSTM+mean
train accuracy:  100.0%
test accuracy:  87.06232492997198%

###LSTMonly + параметры итератора
`lstm_2dirs.py` 44 эпох
train accuracy:  96.01484387926348%
test accuracy:  90.43861684845672%


###LSTM, Тест Игоря
`0_rus_uni_1.py`
Полностью архитектура Игоря
Train loss: 0.0123 acc: 90.6%
Tests loss:  0.0037 acc: 90.8%


###LSTM, NLLLoss
`lstm_igorrus.py`
Архитектура как в 0_rus_uni_1
train accuracy:  97.16831729973764%
test accuracy:  87.32884660013924%

###Alexnet, CrossEntropyLoss, nodropaut aug
train accuracy:  98.81025326797386%
test accuracy:  87.29838709677419%

###Alexnet, CrossEntropyLoss, dropaut, aug
`cnn_fixedT.py`
**train accuracy:  99.90266393442623%**
**test accuracy:  90.625%**
(cnet0): Conv2d(1, 100, kernel_size=(10, 10), stride=(1, 1))
(drop0): Dropout(p=0.001, inplace=False)
(cnet1): Conv2d(100, 100, kernel_size=(10, 10), stride=(1, 1))
(pnet1): MaxPool2d(kernel_size=(2, 2), stride=(2, 2), padding=0, dilation=1, ceil_mode=False)
(drop1): Dropout(p=0.001, inplace=False)
(cnet2): Conv2d(100, 256, kernel_size=(3, 3), stride=(1, 1))
(pnet2): MaxPool2d(kernel_size=(2, 1), stride=(2, 1), padding=0, dilation=1, ceil_mode=False)
(drop2): Dropout(p=0.001, inplace=False)
(cnet3): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1))
(pnet3): MaxPool2d(kernel_size=(2, 1), stride=(2, 1), padding=0, dilation=1, ceil_mode=False)
(drop3): Dropout(p=0.01, inplace=False)
(cnet4): Conv2d(256, 128, kernel_size=(3, 3), stride=(1, 1))
(pnet4): MaxPool2d(kernel_size=(2, 2), stride=(2, 2), padding=0, dilation=1, ceil_mode=False)
(lin1): Linear(in_features=3840, out_features=2048, bias=True)
(lin2): Linear(in_features=2048, out_features=16, bias=True)
(act): ReLU()
(loss): CrossEntropyLoss()

### Conv1d
`cnn1d_fixedT.py`
**train accuracy:  99.93852459016394%**
**test accuracy:  83.41733870967742%**



###Linear only, CrossEntropyLoss, aug
train accuracy:  98.32005718954248%
test accuracy:  76.20967741935483%
