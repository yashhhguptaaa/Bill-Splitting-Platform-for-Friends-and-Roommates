import React , { useState , createContext , useEffect} from 'react';

const BillContext = createContext();

const BillProvider = ({children}) => {

    const [bills , setBills] = useState([]);

    useEffect(() => {
        setBills(JSON.parse(localStorage.getItem('abills')) || []);
    },[setBills]);

    useEffect(() => {
        console.log(bills)
    },[bills]);

    const updateBills = (bill) => {
        const updatedBills = alphabeticalOrder([
            ...bills ,bill
        ]);
              
        localStorage.setItem('abills',JSON.stringify(updatedBills))
        setBills(updatedBills)
    }

    const editBill = (billToUpdate) => {
        const billsFiltered  = bills.filter((bill) => bill.title !==billToUpdate.title)
        const updatedBills = alphabeticalOrder([
            ...billsFiltered ,billToUpdate
        ]);
        localStorage.setItem('abills',JSON.stringify(updatedBills))
        setBills(updatedBills)


    }

    const alphabeticalOrder = (bills) => {
        return  bills.sort((a,b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 :0);
        
    }

    const [selectedCostInterval , setSelectedCostInterval] = useState('Monthly');
    const [editModeEnabled,setEditModeEnabled] = useState(false);

    const deleteBill = (billToDelete) => {
        const billsFiltered  = bills.filter((bill) => bill.title !==billToDelete.title)
        localStorage.setItem('abills',JSON.stringify(billsFiltered))
        setBills(billsFiltered)
    }

    return (
        <BillContext.Provider value={{
            bills,
            updateBills,
            editBill,
            selectedCostInterval,
            setSelectedCostInterval,
            editModeEnabled,
            setEditModeEnabled,
            deleteBill,
            }}>
            {children}
        </BillContext.Provider>
    );
}

export { BillProvider , BillContext };