/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help || args._.length < 2) {
		ns.tprint("this script do the funni and hack server, giving you root access");
		ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}
	const host = args._[0];
	await ns.brutessh(host)
	await ns.sqlinject(host)
	await ns.ftpcrack(host)
	await ns.httpworm(host)
	await ns.relaysmtp(host)
	await ns.nuke(host)
}
