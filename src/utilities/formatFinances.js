export const formatCurrencyLocale = (amt) => {
	return amt.toLocaleString(undefined, { style: "currency", currency: "EUR" });
};
export const formatCurrency = new Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "EUR",
});

export const getPrice = (importe, dimensiones) => {
	const [alt, larg] = dimensiones;
	const total = (alt + 200) * larg * importe;
	const val = formatCurrency.format(total).split(",");
	const integer = val[0].replace("€", "");
	//const cents = val[1] ? val[1].slice(0, 2) : null;
	//const cents = val[1] ? val[1].slice(0, 3) : null;
	const cents = val[1] ? val[1] : null;
	const exe = cents ? `${integer}.${cents}` : 0.0;

	return exe;
};

export const getPriceWithNo20 = (importe, dimensiones) => {
	const [alt, larg] = dimensiones;
	const total = alt * larg * importe;
	const val = formatCurrency.format(total).split(",");
	const integer = val[0].replace("€", "");
	const cents = val[1] ? val[1] : null;
	const exe = cents ? `${integer}.${cents}` : 0.0;

	return exe;
};

export const getTotal = (value) => {
	if (!value) {
		return "0.00";
	}
	const vals = formatCurrency.format(Number(value));
	return vals;
};

export const getTaxativeValues = (total, totalInstallments) => {
	const value = getTotal(total);
	const imptIva = (Number(total) * 21) / 100;
	const formattedImptIva = getTotal(imptIva);
	const formattedTotal = Number(total) + imptIva;
	const showTotal = totalInstallments
		? formatCurrencyLocale(formattedTotal - totalInstallments)
		: formatCurrencyLocale(formattedTotal);
	return {
		value,
		formattedImptIva,
		formattedTotal: getTotal(formattedTotal),
		showTotal: showTotal,
	};
};
