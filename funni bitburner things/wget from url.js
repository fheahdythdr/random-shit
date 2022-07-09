/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([['help', false]])
	if (args.help || args._.length < 2) {
		ns.tprint("gets a script from a url.");
		ns.tprint(`Usage: run ${ns.getScriptName()} URL NAME`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} https://raw.githubusercontent.com/fheahdythdr/random-shit/main/funni%20bitburner%20things/remoteHack.js RemoteHack.js`);
		return;
	}

	const url = args._[0]
	const name = args._[1]
	await ns.wget(url, name)
}
