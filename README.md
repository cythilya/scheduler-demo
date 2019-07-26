# Scheduler

[Scheduler](https://www.npmjs.com/package/scheduler) 這個 package 本來是 React Core 內部在使用的，但是現在開放出來可用於瀏覽器環境，解決 App 效能不佳的問題，我們也可藉此了解 Scheduler 到底是怎麼運作的。

## 排程

先來了解幾個 function

- [runWithPriority](https://github.com/cythilya/react/blob/master/packages/scheduler/src/Scheduler.js#L295)： 設定任務的優先等級，預設是 Normal，對應的過期時間是 5 秒，表示這不是需要立即反應的工作（[備註](#備註)）。
- [scheduleCallback](https://github.com/cythilya/react/blob/master/packages/scheduler/src/Scheduler.js#L373)：插入新任務並做排序。
- [requestHostCallback](https://github.com/cythilya/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L317)：選取任務來執行。

## 範例

點此看[範例程式碼](https://github.com/cythilya/scheduler-demo)。

原始碼說明如下。

第一步，import 所需常數和方法。

```javascript
import {
  unstable_runWithPriority,
  unstable_scheduleCallback,
  unstable_ImmediatePriority,
  unstable_LowPriority,
} from 'scheduler';
```

第二步，加入要執行的任務，參數 priority 用來設定優先等級，例如 unstable_ImmediatePriority（Immediate 要立即執行）、unstable_LowPriority（Low 表示可被等待，但仍需要完成）。

```javascript
unstable_runWithPriority(priority, () => {
  unstable_scheduleCallback(() => {
    // 要做的事情...
  });
});
```

第三步，啟動專案，點擊畫面上的「Click me!」後加入兩個任務 - doFirst 和 doSecond。優先順序為 1 與 4，雖然先加入 doSecond 再加入 doFirst，但由於是用優先順序排序的，因此先執行 doFirst，再執行 doSecond。

第四步，檢視執行結果。

![scheduler](https://cythilya.github.io/assets/react-core/scheduler-demo-2019-07-25.png?123)

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
