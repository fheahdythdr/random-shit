/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const host = args._[0];
	await ns.brutessh(host)
	await ns.sqlinject(host)
	await ns.ftpcrack(host)
	await ns.httpworm(host)
	await ns.relaysmtp(host)
	await ns.nuke(host)
}
