import React, { useState } from 'react'

const MainTabs = () => {
    const [tabName, setTabName] = useState([{ Tab_name: "On Hold", count: "0" }, { Tab_name: "Pending", count: "0" }, { Tab_name: "To Be Dispatch", count: "1" }, { Tab_name: "Ready to Ship", count: "2" }, { Tab_name: "Shipped" }, { Tab_name: "Cancelled" }])
    return (
        <>
            {tabName?.map((tabs, i) => {
                <>
                    <div key={i}>
                        <p>
                            {tabs.Tab_name}  {tabs.count && <span>{tabs.count}</span>}
                        </p>
                    </div>
                </>
            })}
        </>
    )
}

export default MainTabs