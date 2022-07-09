/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const host = args._[0];
    ns.run("remoteHack.js", 1, host)
	await ns.scp("scp.js", ns.getHostname(), host);
	ns.exec("scp.js",host);
	ns.rm("scp.js", host)
}
