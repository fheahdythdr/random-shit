/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const host = args._[0];
	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(host);
	}
	if (ns.fileExists("SQLInject.exe", "home")) {
		ns.sqlinject(host);
	}
	if (ns.fileExists("FTPCrack.exe", "home")) {
		ns.ftpcrack(host);
	}
	if (ns.fileExists("HTTPWorm.exe", "home")) {
		ns.httpworm(host);
	}
	if (ns.fileExists("relaySMTP.exe", "home")) {
		ns.relaysmtp(host);
	}
	if (!ns.hasRootAccess(host)) {
		ns.nuke(host);
	}
	ns.toast(`Root access obtained for ${host}.`);
}
