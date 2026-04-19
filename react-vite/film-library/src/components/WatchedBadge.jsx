function WatchedBadge({watched}) {
    return !watched ? null : <span>✓ Obejrzany</span>
}

export default WatchedBadge;