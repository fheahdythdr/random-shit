/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["purchase", false]])
	const server = args._[0]
	const arg2 = args._.splice(0)
	if (!ns.hasRootAccess(server)) {
		ns.toast("No root access, running remote hack.", "info")
		await ns.sleep(500)
		ns.run("remoteHack.js", 1, server)
		await ns.sleep(500)
		ns.toast("Root access obtained.")
	}
	ns.run("getFiles.js", 1, server)

	// ns.run("deployScript.js", 1, currentServer, "hackScript.js", server)

	const threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam("hackScript.js"));

	ns.tprint(`Launching hackScript.js on server '${server}' with ${threads} threads`);
	
	await ns.scp("hackScript.js", ns.getHostname(), server);
	
	ns.exec("hackScript.js", server, threads, ...arg2);
	
	await ns.sleep(500)
	
	ns.toast("Script deployed to server.")
}
