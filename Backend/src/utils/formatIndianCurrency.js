const formatIndianCurrency = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Optional: you can remove this line if you want decimals
  }).format(number);
};

export default formatIndianCurrency;
