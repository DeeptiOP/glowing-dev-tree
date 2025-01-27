document.addEventListener('DOMContentLoaded', () => {
    const tree = document.getElementById('tree');

    const createBranch = (angle, length, parentBranch) => {
        const branch = document.createElement('div');
        branch.className = 'branch';
        branch.style.height = `${length}px`;
        branch.style.transform = `rotate(${angle}deg)`;
        
        const parentRect = parentBranch.getBoundingClientRect();
        branch.style.top = `${parentRect.top + window.scrollY + parentBranch.clientHeight}px`;
        branch.style.left = `${parentRect.left + window.scrollX + parentBranch.clientWidth / 2 - 2}px`;

        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        branch.appendChild(leaf);

        branch.addEventListener('click', (e) => {
            e.stopPropagation();
            growBranch(branch);
        });

        return branch;
    };

    const growBranch = (branch) => {
        const length = branch.clientHeight * 0.75;
        const angle1 = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees
        const angle2 = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees

        const newBranch1 = createBranch(angle1, length, branch);
        const newBranch2 = createBranch(angle2, length, branch);

        document.body.appendChild(newBranch1);
        document.body.appendChild(newBranch2);
    };

    const initialBranch = createBranch(0, 150, {
        getBoundingClientRect: () => ({ top: 0, left: window.innerWidth / 2 - 3, width: 6 }),
        clientHeight: 150,
        clientWidth: 6
    });

    document.body.appendChild(initialBranch);

    tree.addEventListener('click', (e) => {
        e.stopPropagation();
        growBranch(initialBranch);
    });
});