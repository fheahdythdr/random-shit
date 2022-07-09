/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	const host = args._[0];
    	if (!ns.hasRootAccess(host)) {
			if (!ns.fileExists("remoteHack.js", "home")) {
				await ns.wget("https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/remoteHack.js", "remoteHack.js", "home");
			}
			ns.run("remoteHack.js", 1, host);
	}
	await ns.wget("https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/modifiedscp.js", "scp.js", host);
	ns.exec("scp.js",host);
}
