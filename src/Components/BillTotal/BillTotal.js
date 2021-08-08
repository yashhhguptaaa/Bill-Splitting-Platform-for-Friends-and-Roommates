import React, { useContext, useState } from 'react';
import { BillContext } from '../../Context/BillContext';
import './style.css';

const BillTotal = () => {

    const { bills, selectedCostInterval } = useContext(BillContext)
    const [totalSplit, setTotalSplit] = useState('1');

    const splitValid = () => {
        const validSplit = totalSplit && Number.parseFloat(totalSplit);
        return validSplit;

    }

    const moneyIntervalTransform = (cost) => {
        const monthlyCost = Number.parseFloat(cost);
        switch (selectedCostInterval) {
            case 'Monthly':
                return monthlyCost;

            case 'Yearly':
                return monthlyCost * 12;

            case 'Weekly':
                return monthlyCost * 12 / 52;

            case 'Daily':
                return monthlyCost * 12 / 365;



            default:
                return 0;
        }
    }
    return (
        <>
            <div className="add-bill-container1">

                <input className="add-bill-form-control1 form-control"
                    placeholder='No. of Persons'
                    type='Number'
                    value={totalSplit}
                    onChange={(e) => {
                        if (splitValid()) {
                            setTotalSplit(e.target.value)
                        }
                        else {
                            setTotalSplit('1');
                        }
                    }}></input>
            </div>
            <div className="calculation-container">
                <div className="bill-total-container">
                    {selectedCostInterval} Bill Cost :
                    <span className="total-cost">
                        {
                            'Rs.' + bills.reduce((acc, val) => {
                                return val.enabled ?
                                    moneyIntervalTransform(val.monthlyCost) + acc :
                                    acc
                            }, 0).toFixed(2)
                        }
                    </span>
                </div>

                <div className="total-saved-container">
                    You saved :
                    <span className="total-saved">
                        {
                            'Rs.' + bills.reduce((acc, val) => {
                                return !val.enabled ?
                                    moneyIntervalTransform(val.monthlyCost) + acc :
                                    acc
                            }, 0).toFixed(2)
                        }
                    </span>
                </div>
            </div>


            <div className="calculation-container">
                <div className="bill-total-container1">
                    Per Person {selectedCostInterval} Bill Cost :
                    <span className="total-cost">
                        {
                            'Rs.' + bills.reduce((acc, val) => {
                                return val.enabled ?
                                    (moneyIntervalTransform(val.monthlyCost) + acc) / totalSplit :
                                    acc
                            }, 0).toFixed(2)
                        }
                    </span>
                </div>

                <div className="total-saved-container">
                    Per Person saved :
                    <span className="total-saved">
                        {
                            'Rs.' + bills.reduce((acc, val) => {
                                return !val.enabled ?
                                    (moneyIntervalTransform(val.monthlyCost) + acc) / totalSplit :
                                    acc / totalSplit
                            }, 0).toFixed(2)
                        }
                    </span>
                </div>
            </div>

        </>
    );

}
export default BillTotal;