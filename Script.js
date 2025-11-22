        function animateNumber(el, target, duration = 2200, isPercent = false) {
            const startTime = Date.now();
            const step = () => {
                const progress = Math.min((Date.now() - startTime) / duration, 1);
                const value = isPercent 
                    ? (progress * target).toFixed(1)
                    : Math.floor(progress * target);
                el.textContent = isPercent ? value + '%' : value.toLocaleString() + '+';
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }

        async function loadChangelog() {
            try {
                const res = await fetch('changelogs.json');
                if (!res.ok) throw new Error();
                const logs = await res.json();
                const container = document.getElementById('changelog-list');
                container.innerHTML = '';
                logs.forEach((log, i) => {
                    const item = document.createElement('div');
                    item.className = 'changelog-item';
                    item.setAttribute('data-aos', '');
                    item.setAttribute('data-aos-delay', 100 + i * 80);
                    item.innerHTML = `
                        <div class="changelog-date">${log.date}</div>
                        <div class="changelog-content">${log.content}</div>
                    `;
                    container.appendChild(item);
                });
                document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
            } catch (e) {
                document.getElementById('changelog-list').innerHTML = `
                    <div style="text-align:center;color:#f66;padding:1.5rem;font-size:.85rem;">
                        暂无日志
                    </div>`;
            }
        }

        function buyNow() {
            document.getElementById('group').scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const link = document.getElementById('discord-link');
                link.select(); link.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(link.value).then(() => {
                    const btn = document.querySelector('.copy-btn');
                    const txt = btn.textContent;
                    btn.textContent = '已复制!'; btn.style.background = 'linear-gradient(90deg,#10b981,#34d399)';
                    setTimeout(() => { btn.textContent = txt; btn.style.background = ''; }, 2000);
                });
            }, 800);
        }

        function copyLink() {
            const link = document.getElementById('discord-link');
            link.select(); link.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(link.value).then(() => {
                const btn = document.querySelector('.copy-btn');
                const txt = btn.textContent;
                btn.textContent = '已复制!'; btn.style.background = 'linear-gradient(90deg,#10b981,#34d399)';
                setTimeout(() => { btn.textContent = txt; btn.style.background = ''; }, 2000);
            });
        }

        const observer = new IntersectionObserver(es => {
            es.forEach(e => { if (e.isIntersecting) e.target.classList.add('aos-animate'); });
        }, { threshold: .1 });

        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                animateNumber(document.getElementById('exec-count'), 438563, 2200);
                animateNumber(document.getElementById('user-count'), 200, 2200);
                animateNumber(document.getElementById('success-rate'), 99.9, 2200, true);
            }, 400);

            loadChangelog();
            document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
        });
