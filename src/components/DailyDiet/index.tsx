import React from 'react'
import { Collapse } from 'tdesign-react'

const { Panel } = Collapse
export default function DailyDiet (): JSX.Element {
  return (
    <div className='daily-diet'>
      <Collapse defaultValue={['breakfast', 'lunch', 'dinner']} borderless expandIconPlacement='right'>
        <Panel header="早饭" value="breakfast">
          这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
        </Panel>
        <Panel header="午饭" value="lunch">
          这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
        </Panel>
        <Panel header="晚饭" value="dinner">
          这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
        </Panel>
      </Collapse>
    </div>
  )
}
