/** @param {NS} ns */
export async function main(ns) {
	const files = ns.ls(ns.getHostname(), ".lit")
	const dest = "home"
	await ns.scp(files, dest)
	tprint(`transferred ${files} to home`)
}
