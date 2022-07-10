/** @param {NS} ns */
export async function main(ns) {
	const files = ns.ls(ns.getHostname(), ".lit");
	const cctfiles = ns.ls(ns.getHostname(), ".cct");
	const dest = "home";
	await ns.scp(files, dest);
	await ns.scp(cctfiles, dest);
}
