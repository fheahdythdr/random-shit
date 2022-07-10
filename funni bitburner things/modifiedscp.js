/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const files = ns.ls(ns.getHostname(), ".lit");
	const dest = args._[0];
	await ns.scp(files, dest);
}
