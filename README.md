# Scheduler

[Scheduler](https://www.npmjs.com/package/scheduler) 這個 package 本來是 React Core 內部在使用的，但是現在開放出來可在瀏覽器環境應用，解決 App 效能不佳的問題。

我們也可以藉此來了解 Scheduler 到底是怎麼運作的，或如何更好地利用它來解決各式各樣的問題。

## 排程

首先我們先來了解幾個 function

- [runWithPriority](https://github.com/cythilya/react/blob/master/packages/scheduler/src/Scheduler.js#L295)： 用於設定任務的優先等級，預設是 Normal，對應的過期時間是 5 秒，表示這不是需要立即反應的工作。
- [scheduleCallback](https://github.com/cythilya/react/blob/master/packages/scheduler/src/Scheduler.js#L373)：用於插入新任務並做排序。
- [requestHostCallback](https://github.com/cythilya/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L317)：選取任務來執行。

## 範例

點擊「 Click me!」後加入兩個任務 - doFirst 和 doSecond。

優先順序為 1 與 4，雖然先加入 doSecond 再加入 doFirst，但由於是用優先順序排序的，因此先執行 doFirst，再執行 doSecond。

[範例](https://github.com/cythilya/scheduler-demo)。

執行結果

```javascript
first;
secoed;
```

## 解決什麼問題？

假設某個 App 在同一時間內要做很多事情，例如：針對使用者輸入的字串做分析，然後畫出對應的圖表或是畫面，就可以利用以上的方法協助解決效能問題 - 優先更新 input 欄位的狀態，再更新對應的圖表或是畫面，看起來就不會卡卡的。

可見範例-[scheduletron3000](https://github.com/philipp-spiess/scheduletron3000)，[原始碼](https://github.com/philipp-spiess/scheduletron3000/blob/async/src/index.js#L46)。

## 備註

- 優先等級與對應的等待時間

  - Immediate (1)：必須立即執行。
  - UserBlocking (2)：過期時間是 250ms，這是由於使用者從與介面互動到取得反應的時間若為 250ms 是會感到順暢的，可參考 RAIL 模型。
  - Normal (3)：過期時間是 5 秒，表示這不是需要立即反應的任務。
  - Low (4)：過期時間是 10 秒，任務可被等待，但仍需要完成。
  - Idle (5)：過期時間是 1073741823ms，永不過期。

## 參考資料

- [Scheduling in React](https://philippspiess.com/scheduling-in-react/)
