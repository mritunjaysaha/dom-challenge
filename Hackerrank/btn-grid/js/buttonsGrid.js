console.log("loaded");

const ids = [1, 2, 3, 6, 9, 8, 7, 4];
const nums = [1, 2, 3, 6, 9, 8, 7, 4];

const btn5 = document.getElementById("btn5");

console.log({ btn5 });

btn5.addEventListener("click", () => {
    console.log("clicked");
    nums.unshift(nums.pop());
    for (i = 0; i <= 7; i++) {
        document.getElementById("btn" + ids[i]).innerHTML = nums[i];
    }
});
