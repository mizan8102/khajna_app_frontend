export function amount(amount: any): string {
    const options = {
        style: 'decimal',
        maximumFractionDigits: 2,
        useGrouping: true,
      };
      
      return amount.toLocaleString(undefined, options);
       
}
