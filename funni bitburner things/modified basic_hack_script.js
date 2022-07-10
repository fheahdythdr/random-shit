/** @param {NS} ns */
export async function main(ns) {
    const args = ns.flags([['help', false]]);
    const hostname = args._[0];
    ns.share()
    while (true) {
        if (ns.getServerSecurityLevel(hostname) > ns.getServerMinSecurityLevel(hostname) + 2.5) {
            await ns.weaken(hostname);
        } else if (ns.getServerMoneyAvailable(hostname) < ns.getServerMaxMoney(hostname)) {
            await ns.grow(hostname);
        } else {
            await ns.hack(hostname);
        }
    }
}
