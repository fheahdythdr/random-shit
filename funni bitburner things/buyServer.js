/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const name = args._[0];
	const mult = args._[2];
	var num;
	var ram;
	if (mult) {
		num = args._[1];
		ram = num * mult;
	}
	else {
		ram = args._[1]
	}

	ns.purchaseServer(name, ram)
}
