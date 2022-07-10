/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]])
	const server = args._[0];
	const arg1 = args._.splice(0);
	if (args.help) {
		ns.tprint("This script gets root access on a server, gets files on said server and then deploys hackScript.js to said server.");
        ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
	}
	if (!ns.hasRootAccess(server)) {
		ns.toast("No root access, running remote hack.", "info");
		await ns.sleep(500);
		if (!ns.fileExists("remoteHack.js", ns.getHostname())) {
			await ns.wget("https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/remoteHack.js", ns.getHostname());
		}
		ns.run("remoteHack.js", 1, server);
		await ns.sleep(500);
		ns.toast("Root access obtained.");
	}

	if (!ns.fileExists("getFiles.js", ns.getHostname()) {
		await ns.wget("https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/getFiles.js", ns.getHostname());
	}
	ns.run("getFiles.js", 1, server);

	// ns.run("deployScript.js", 1, currentServer, "hackScript.js", server)

	const threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam("hackScript.js"));

	if (!ns.fileExists("hackScript.js", ns.getHostname())) {
		await ns.wget("https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/modified%20basic_hack_script.js", ns.getHostname()
	}

	ns.tprint(`Launching hackScript.js on server '${server}' with ${threads} threads`);
	
	await ns.scp("hackScript.js", ns.getHostname(), server);
	
	ns.exec("hackScript.js", server, threads, ...arg1);
	
	await ns.sleep(500);
	
	ns.toast("Script deployed to server.")
}
