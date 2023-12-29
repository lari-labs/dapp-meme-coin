const getAddressData = ({ pubkey, address }) => ({
  pubkey,
  address,
});

const TestWallets = {
  twofifty: [
    {
      address: 'cosmos1p00xhl9ysacadcduxglhavstr8yvh9hfzk6z6w',
      pubkey:
        '033f1d99e8f90c8b46e7a2f14f3fa52ce484bd419744b3bac58db2b227b87a2e5a',
      PrivateKey:
        '047baf28b432df107dcfb71d21ecc93a655cfaf842b5e4268a9603369c39c47d',
    },
    {
      address: 'cosmos1yquxnvua4me07zxyq85fnxkdg9htqvn90x8m7h',
      pubkey:
        '025eda8605379dfb687b5dbe8407dc274422c42c86b8a189981a291d659f549364',
      PrivateKey:
        '5ecfeeeca63458184a5018855962eb3828d6816e5f4fa95646ee9d05bb63107b',
    },
    {
      address: 'cosmos1l8ccn5mvam289seaxlyghx57d8v2m4wm6ulttw',
      pubkey:
        '021885e7ef16cfeeaab81ef33b9c03c223ea81150f505e92ad73080a3c6dafb857',
      PrivateKey:
        '16355f5449214a05cd797fb54fc4f174488d91020b5ea2b3ddf200c568fcab6a',
    },
    {
      address: 'cosmos1rsffgqju8cuvrnvvxk2yw2q0ylwzk8mg6ly4gw',
      pubkey:
        '02032e4185a7bec887ac18d07e5e9d07ad830acd5d01103c1c001fd7187cf15d4c',
      PrivateKey:
        '98fe7a44a10c4a94d4adbb51a6dcbab88033b7a5b3407dd471a28fa969e12551',
    },
    {
      address: 'cosmos1s4nhzkq3ch39me9lclcp4ynk2ywntlcwf887kw',
      pubkey:
        '02d5ba5f9a658c0078139b4e75f6e2071eb178caa07204b9f19f769e59c92714a1',
      PrivateKey:
        '2b102f801df6f2ca068434d5b58f51f077a9c222ab94281debc8c550cb52ac8e',
    },
    {
      address: 'cosmos12qu2l5kf0qpy3jhe42ny55fjqd9n060c2nvw3h',
      pubkey:
        '031072355dfb869f3ea160f4c6e20b0645f251699912a004e881f7f5953572207e',
      PrivateKey:
        '57b7f7961b0dc4e170d131abf70e3b817503c3c9f73c9d7b4be3fbcc6d27f15b',
    },
    {
      address: 'cosmos1sndu8k4j539qzler2p0vqgguqkp2lp2wztlc0p',
      pubkey:
        '02e3d793ab0927f6601722c7e0e9f7c72f984f1a8fb88c96162ecff86728274aee',
      PrivateKey:
        '8069b72e1d938ceea51c05747a171321772bd327cc27ebac66c0582ffd629491',
    },
    {
      address: 'cosmos1r9pz0v0qwj7pkvx5ww2q3cmhwh0assswevxzrz',
      pubkey:
        '028e2cedcb2ef9c0c379fb2c2fc30e4652650a7e01ad0a184603ed3a8ca722038f',
      PrivateKey:
        '0300b2404944c584f6475c7e4b13527beb993ecae459c92aa239c516ceb862a0',
    },
    {
      address: 'cosmos13r67v3nk24654e2l372rexk7uxhxutu92ugyt3',
      pubkey:
        '02c94b80607f17fcfbf2a9e4644098e5dc4355e4210d95df705031ca2df50165ce',
      PrivateKey:
        '5a049bc85c198d5813974850bc0c02b87f683f6661b83c43268407603f4b800c',
    },
    {
      address: 'cosmos17w9swykduq93glcx2mldsszulprawretga4sqj',
      pubkey:
        '034a99cb095545620e3cf5d4c499c66f466fce6f46fb1b179801113fb2921fb62e',
      PrivateKey:
        '678ae4d4e18dd8f6760dda9c4be2873b5ddc24ce6b453039fb5c6ea6907d125a',
    },
    {
      address: 'cosmos1rwe66qnhae7t367lwektca4kyxgxudydrnvn0e',
      pubkey:
        '038c988403bb35a73cf2632163fc2730cdd3a3b11c0490ecc458d5694bc7983c24',
      PrivateKey:
        '829e16bc0202143b72bada0b5272d5ede84ec124819e1d2e8c07961a44015de4',
    },
    {
      address: 'cosmos15te8hlpga2j6jtrgtp8zcezmc00ln0s2juw5dd',
      pubkey:
        '03ae60c45bfb2465d2a0262173e78f3f59a5215bd132ac7da7cbcf84eae7bdd37b',
      PrivateKey:
        '03e14ebd84723671743e3c1cf557972050d702da02a3681ab2d1e5dc9161cdf6',
    },
    {
      address: 'cosmos1snxfkyhvls9l4q6urd099z58lxwjqwtdt50t4t',
      pubkey:
        '0370ffab310beb257e6549d6deb75482e37939fc2b42f025c1c1aab7112d3ae72c',
      PrivateKey:
        '0b0ad05110e1f7c0b1beffb5913c70e79fbcbee9da1ffd6db30be165b7abcbbc',
    },
    {
      address: 'cosmos1w0thjxkjq3s0szl9gy3tjnjd92zd4eqyp540qv',
      pubkey:
        '02ca487266c18d539f1122d797a5d4c3cba4f560bd3599e59c8f614593bd1b4879',
      PrivateKey:
        '89e99e837916d884df7052a8b29b00c646e878b7e746453393be9b89b1d3289d',
    },
    {
      address: 'cosmos1w7a3p7uaeyjljkfdynd9uqzs0c885dyv6t63xc',
      pubkey:
        '02c743007ed0675b0d4dcdca8ac0967eed819c93d4b0a8cedae34a2ff74dd29192',
      PrivateKey:
        '2951a81c1d9df64500640e9f09856769f36c8a3c90668fde578e7e79f1134ae0',
    },
    {
      address: 'cosmos1pmqmn6dsm3t4rsw9y40azh2vkket3xhsunksjv',
      pubkey:
        '02231a20f91feb6560906370426689b30e03ca3d915b46a98b4d6e88c10fed6bd5',
      PrivateKey:
        '3b908dd58c907311da081155a12641cba7ad4c95c4b18caa94370013790a6544',
    },
    {
      address: 'cosmos1wmk9nxhngp639nmdgw7fywh5c7j3cg0zn8hw0h',
      pubkey:
        '03a22f83648c4adae6869db53712d8d2a2a32a95143f80a085109ce77602e967a5',
      PrivateKey:
        '9a55ae0d8cd4100082ca4fd5fdad330d135e84d1e954a5aef24ce264b02c7847',
    },
    {
      address: 'cosmos1th6dz6wf48hr4a00pjndumcjrwv3em823j53lu',
      pubkey:
        '03f5d37a63a6e379da7ba27f551deaac388ff78aec006593479dcd1e05da98a413',
      PrivateKey:
        'b497cb07e223dc15a45867f542dc02ef1a6551a6da06d2bc7867e14d2f106e5a',
    },
    {
      address: 'cosmos1xpelvpdcualkvqcd54qpccxgnfzlxpq8e6522e',
      pubkey:
        '03a393201192256a55a698ad28d25f9e5c136da61bcc8678809b59d739fd4355cc',
      PrivateKey:
        '482c603886eee92362e1d0cbbdef367c35fd1ceee3f703bd7cfc7616318e1cf0',
    },
    {
      address: 'cosmos1xjuhhjgeyaak6wm55xdvwstd4vje5ud85ltaxe',
      pubkey:
        '023e08998c5d3d5a2197cc94eefb15ae15a19d50f9dd49837a616a303e1b6b75aa',
      PrivateKey:
        '9b06f76f6f2d940ba4ee9398cafb822edfac8144f0d25f81295b5400b6794a06',
    },
    {
      address: 'cosmos1haqccwcs7p2sp36pw4ppslesjl8zwtw3f4k3lg',
      pubkey:
        '034a226551925a5254ab13e8e24f7a4a82f3764e2c18c87a8e2af4f577cd13a914',
      PrivateKey:
        '69624d803c0d494b619826be2946fc96c8916406c945661d5a4890e743aa0e40',
    },
    {
      address: 'cosmos1ezd8jnkxwyk6dnvt599ud3xatu90gu6s7w4nzm',
      pubkey:
        '03f709442e2369458cd35fd50cb049d0695b15a8b62991452aaf5403b6c2a8da14',
      PrivateKey:
        'a96abb039934cc5f363596147e8aaf71eaace24ed87d821570986d830edc6695',
    },
    {
      address: 'cosmos1dlfhsvnduhhjcxqxw9vjmzvvsue475fs56ea9f',
      pubkey:
        '028b1a77bf813de1a037f3f47d64db17c54a4f23ae4a631e55fccc175d54b11abb',
      PrivateKey:
        '85e8a4548694b2f5e9d7de8025866774a7229c91fccce27f88f91fcd46ed91fc',
    },
    {
      address: 'cosmos1jxgd4e2a000qgx9zn3pwlgu57wtx5cp3mvk0lv',
      pubkey:
        '0386dab583464ab0835039c15b75943976c7fa99d2de61c2a6bdfcb83a14ceed0c',
      PrivateKey:
        '0b96b6a9e05dbf7a9a856499b402ca607fc8a464efc722107cbfb09600a286fe',
    },
    {
      address: 'cosmos1y3vx7n47l3qhphte9rzkln0egesxvpmj375u4h',
      pubkey:
        '02e8bc0e3f13fb783f678bbce9f74d11293af61c5ff1633dc6221ea98dad90d38b',
      PrivateKey:
        'db8489d8d36cbd6ae090067eaecba3c96abd41197610e55fb1f16c0af194593b',
    },
    {
      address: 'cosmos177c4nzkhrtkwdqkzdrsvr8hf6ug74c3slv82hs',
      pubkey:
        '02a791cc602afbe9fe40128c6c94c6a50a19f75772b87d4d674294417ec40fc180',
      PrivateKey:
        'e11be09fcc77b150310bda14197dbe51afec4bc4e531605c96505fa9f28e06b1',
    },
    {
      address: 'cosmos12g3q9yecukae80v6vnn8vfr83d83cxgtg9fwc9',
      pubkey:
        '02681f4c3da360a61eb55bb695d3337536a918918ce3fd0e2300b53b43b5e28f2e',
      PrivateKey:
        'a97174d1d7f2a58ed5ded668f1ff7c23e7a2bd4b8e0a4b395f38d5b10a24f783',
    },
    {
      address: 'cosmos17gptnjky9j5vd5y0ucagkxdzmetlrphzpg47sw',
      pubkey:
        '028dacb08bf34ea769f0b8c4471443ce0b6aeb053d316098d82b451ab301214bef',
      PrivateKey:
        '071aa21bf4ce8c49e913b9efe9c53129ebd7192c37ddd0ac461a8f1a1a1fdc96',
    },
    {
      address: 'cosmos148epvp4sa0v9c8xr96lue6ujl8s855vx87mcuq',
      pubkey:
        '02d4e87253b4830a19b4c90f5ba561395b3070106a8759ae9a4b5e8e067f93a68d',
      PrivateKey:
        'ecd382dc3da0840410e0d22917d439e3052cff75e899469e3a32a3d262ce3a67',
    },
    {
      address: 'cosmos18xe0x5xdg32u006grp95fjkm7uxe0cc2zenvvz',
      pubkey:
        '032c9f6e32671e4f1b0261f11ee47d8d40dd720f2e0e67245d7ca477947a9a7373',
      PrivateKey:
        '4f833fb0d29eb5dc61336b13b6633cf8d739a3ea58623db5defd888b6f7dc4e9',
    },
    {
      address: 'cosmos1ssxxwk9cyfe598tep4yjnyn8us0fv4lue8w77g',
      pubkey:
        '03027d6d5c72152e1dd96816423744e738ecf9b7085600624689b7c1f84c8145b7',
      PrivateKey:
        '09a9216c1d1ec99e59438639d817cc4ccd55cd4b691a4dc2f1b713947897a30a',
    },
    {
      address: 'cosmos1drltduf9ytkqfuxvdxdv398pq42vl2swrdvp3n',
      pubkey:
        '035b70a5c6fdb13bb356b3cb02b56e2a2fb2afaa97b1350648465bf2d5a5ed157d',
      PrivateKey:
        '42cd8d00a9d1e626751cbf6199aa7ed5438ccfd70649fea6dc57afc873f62348',
    },
    {
      address: 'cosmos1tvhgxfezuzs64s0qjay03dc8q9yhtfygas8z98',
      pubkey:
        '02968300e413369c9a7506da76734277addb39a46d12b01a6d65560fd2c7c51b78',
      PrivateKey:
        '33066605351ed62d78ab74519c8aedbeadaef7a1ff3445277ec106bf70701513',
    },
    {
      address: 'cosmos1jsrtzg5srla7r497hlgp5772edhfq82svejgaw',
      pubkey:
        '03c56d574d07b5a66c77025c3d1b40579623a34db2d9d88ee3dc2a6a8215dc010b',
      PrivateKey:
        '3162ee1ada880af793b3aa88a93550165908c5008391840ebf77ff499c2364c2',
    },
    {
      address: 'cosmos15kxxzl6ha8dtmz27qyn5n45nuaxpmz2gg3dnwc',
      pubkey:
        '03e19bde7d1f72c9807ab9f7095181d086e770a9461fc0dd55717d5360762ba5bf',
      PrivateKey:
        '9a18bcb7ecd752e0ce0a6b50e11a85656256ff7d790e12c0c1b9fd4f4ed16796',
    },
    {
      address: 'cosmos1kpqrm42wxhns8098uxnr46r5l5nwqhfnr7x2gs',
      pubkey:
        '03bec3d3be94d013d355f7e6118d593aa0500d1d46abafb818e16edde6e7fe370c',
      PrivateKey:
        'c3c1d86b13ce9747c5785759d39bcac809a5acf269bce0568ed2ea8bbe88604b',
    },
    {
      address: 'cosmos12hfwpdvjrf4mp8wsyz0prwrxxq5lw26ell6k5r',
      pubkey:
        '030832a9eaee193472ed74884045b960652400afb585513975f5403ad122c9dcfe',
      PrivateKey:
        '0c73d880f222d0e78b7705422c61d684621890aa3a2db740a253f5e9309be432',
    },
    {
      address: 'cosmos1uav2ergg7xdfrwwvmjj9etqmp8m6nhwva3nr9f',
      pubkey:
        '02bcb96ecfdf5ea77d9870b53b4c5756b32d85dd8499832b4bf3e6e0f2fd62db8b',
      PrivateKey:
        '0032b88b5f42051670bb5deaf21c2f2dcd2a7f8b50d1bf7656392437152b7c6f',
    },
    {
      address: 'cosmos133fqzcy5kk724v24dekxqzvymq8kk0ww33rtyx',
      pubkey:
        '0301582f547720823e44c7a980c9fc039401be0be1fafd69a2cba29eda4586e456',
      PrivateKey:
        '23089395a9952667e697dd10fea70b14baf6d907654935e73fa5abd5bec8f674',
    },
    {
      address: 'cosmos1gwwljcpkur52xv7r9kull7fq2r09kg2ug623e4',
      pubkey:
        '03e753345566414e109844170627a46e86e554197b7eb44397a3b648cc9452edc2',
      PrivateKey:
        '5725e1fba274aa04abaa551aab212d40374bfd3cc75c6bc7b30659aa7b17570b',
    },
    {
      address: 'cosmos1rq0vzzu3g2qys5vm9uelf9cyycfahwl4cllpn9',
      pubkey:
        '028e56b61d2afadc6d7f524a3abdf694a4a989afc91d74fddac6c5160758d1d149',
      PrivateKey:
        'e36e89f12c3127a224e4bca7359e7bca44699aefa09d33f2551b720686bde610',
    },
    {
      address: 'cosmos1hyw6n7xdj95m9tuqw44u9seuqy0q0j6d6vat70',
      pubkey:
        '034fb1563ae64f6d022d630fc5b2e983ecf2cf83f1c2053160399d16be0090eec6',
      PrivateKey:
        'da94685dae18a64a36aad5abdac2671cf8668a06f54230428d3cf6fc0b06c534',
    },
    {
      address: 'cosmos13r958hg5msfmtlvv3d644z80tj80hnmh9vdemr',
      pubkey:
        '03d1a89479dab5c38a426127471500da2f334f6616a3f2a6e2b0f39ac4e40a77e8',
      PrivateKey:
        '00617328a402930265eefb859daa3832bb8d26ddbf91f5c0b1eb6f9914e66467',
    },
    {
      address: 'cosmos14cmqttp6qalkd6vmf2v4h3tl66lsm2d32zz3kd',
      pubkey:
        '024455c6d35015550df74dee55e25fa161002f5b933f6e865f21d45e3bf6515931',
      PrivateKey:
        'dcb9718f7871febc5b5ea78b599aa8d5b20460e53633d901092b869be474e277',
    },
    {
      address: 'cosmos18sfjcay596e4w7p8dac8mnau6cw3qy2w46h5j0',
      pubkey:
        '03219f094f7fab0d30fce3f5c8ad3aa9c86a91adcf2ae37fc5d50838d3871a95cd',
      PrivateKey:
        '14a169a834fbb1019d006564b9f8db549c6cf299f2c1e9ab9f2dd2e90c395eca',
    },
    {
      address: 'cosmos1cd5gkxzul6ztel7fwxz26lhrkepjk05pdgnakp',
      pubkey:
        '03f2c678db60b999c6bc3317c96375da616d56e61dbf0a93751bd7c2356abd0e69',
      PrivateKey:
        '36d0c02d7fc2cafba4c50b9ff2be89f298377e383482b534acc74cf06534bff4',
    },
    {
      address: 'cosmos172rwxq8jtm0q8nnvmcwxcnglj600kjnxx8dc5m',
      pubkey:
        '03bec28f0d067a8bce963f7b80fa6f219250402f8b8577dcef1528067eef2acc09',
      PrivateKey:
        'b7d8fc6d97d3806e1dccb9260fed08a3396c43a60856cc3ae86d6fa6231558b5',
    },
    {
      address: 'cosmos1dkq0g7fuk5gakqycxrm03s9c9943p43lm0x9kk',
      pubkey:
        '0365ec3789cc50868d7d09e78e35b4d297fb9382e834378c99e0ba9f0f5efc9592',
      PrivateKey:
        '4005bdaa2d46bc3595cba6085c1982401638f6ca245249ea48c1f7dd411d851d',
    },
    {
      address: 'cosmos1rv2xfetttqzgw3elpxe26p4sz9ht5tzws48qsc',
      pubkey:
        '03acd18ecb5e59baffd6b6af2602a329dfbaa0a8fabbfe35907b1854e385037d60',
      PrivateKey:
        'bff30b0e20ff683af9f25f5eb14d63df92421f1c9d79edea76760efe71127368',
    },
    {
      address: 'cosmos1d9w76sgyusgz0xrs4zsjlm7z5vg47endng3k3y',
      pubkey:
        '02b9ff9dbda824225247ba7a84c66b791a1f8806922fcf9239564e0f8de9fb7c82',
      PrivateKey:
        'e1a0e9db08de56aee83db0cd3caf740bc2e54ae65adfff30bfb812832b1c78ff',
    },
    {
      address: 'cosmos19z5xw33q6gmws9gwy8nw7lz9cc9rwunvt7ktu2',
      pubkey:
        '03fd2182166325c397b5a430372a5d7e669ce182f5e0d00cb5e83fd846d9cce4c4',
      PrivateKey:
        'c090f7673cca09d513406a4cbed49013eb376260189f3bc1d611a2701c4ea785',
    },
    {
      address: 'cosmos1a2qur9kwd2p3fnmyhpe7xk8rv04xuh3a4e285x',
      pubkey:
        '0393aaeaa148959eb5965d75c4fe0162415bfb9cc1472b76d2c1e017b6b957286f',
      PrivateKey:
        'd6aeb87cf9caf099aa599bf271d6b3c307545df619b425b935cdcdbbe4ed9396',
    },
    {
      address: 'cosmos12en8ejqt8v2yahwle8gwwr04kvyjaapky5mtrr',
      pubkey:
        '0265023bbfc455e2b71726454378cabff1197b86399331d60b1189ecdd17e1a4eb',
      PrivateKey:
        '51b2e5acca40ae09463a6ff5ba106f7ee036a41d0b04633ea05d07b3f85d1a9c',
    },
    {
      address: 'cosmos1jeu2zg2w0x0k9whexy52kdesjzxqlzynvp3mk9',
      pubkey:
        '0353831bef6870677e5c064fccfd64ac21268276746e0451282511b30e0d0de0a2',
      PrivateKey:
        'ec9525eda485e1cb3c9bf2f839a1bb713211672792ef67ae721203789269d5dd',
    },
    {
      address: 'cosmos1h04w9ynr3sdtuphs8myq7wxu3ka3x9s8v8vuka',
      pubkey:
        '028e7e032e23e3ed546b6fc517e5059c70827868b5d43ece061f99252709323128',
      PrivateKey:
        '918d3e63bbd7f33eb734e5cc7e8dcc277d74b4cea704d249341e2315121c860b',
    },
    {
      address: 'cosmos1qcne0mun8n78j54le7kcp4my8merfeg9p5wt7k',
      pubkey:
        '026cf034803efba2fcc34b883fddb56392d6d9c927d8ae927b6c2fd085f2558371',
      PrivateKey:
        'fd070abed92ee0b8f46ac6aefddbf059b4dc7123eb2e0d7d9e32368eaa859ed4',
    },
    {
      address: 'cosmos1xefv2zkzrjthgmt5vdmxmex8unkj36nu875h7n',
      pubkey:
        '02f01ada83ff8224ede6f2d8f6ec91da7f9a222c8839585c46007018e5b135ec9e',
      PrivateKey:
        '992eaa3a2d15c8679df9b3770472460293f558eb6c62ab69867d3d6897001678',
    },
    {
      address: 'cosmos1s5y4se5frmrdxsc2medhk7xpvudk9pcrntv90q',
      pubkey:
        '020a14fc6d99388bf5b7d01cf9dbbeefdbcaf7dbdb2c10d1fd74005ca0be2d86b0',
      PrivateKey:
        'b4d1d748afb682633834cedeb820acb22ec84eb1c70cdd606306308d6bf5bd91',
    },
    {
      address: 'cosmos1dsa60l4988azphe47ptamwmszmpxzv86ns2tha',
      pubkey:
        '03d69d967c656ab41de01701301bf167f331761a4c998d7999af257573ac1be112',
      PrivateKey:
        'abe7a19cb0136cf830d7c8741537a2c0cdd8b9a7e6355ab01c890a8fa10bb2b5',
    },
    {
      address: 'cosmos1r3ewrrrtl50899vddeyad9tflunskmlc90v9gx',
      pubkey:
        '036c9e7fc6b596c14054049e4fcaa8306665b2b3db4cc17fc731d274f6ee8ff2a1',
      PrivateKey:
        '9e5921efdcf6cc5c52f031471284109a4673289619819ef5c9ff7e37d5a46ddc',
    },
    {
      address: 'cosmos1gm4gxg3rhysjxheurxq77jkrr2qvqhsrrulmxf',
      pubkey:
        '025a50a299c066b9b6576a05a8e715a50814d07c85d41b8de27f6c2a973805f10e',
      PrivateKey:
        'a2d6eb982e6d44a262880fa356413e893a512352b877a715818c2f1ed2c056e4',
    },
    {
      address: 'cosmos1rw0usrr84hxwz8fye0ccad6rkd0kehqtzg663d',
      pubkey:
        '02703bfb98cbd45420e7683d899bbd367df4cfd684ea7808189ef9e403eb1fe24b',
      PrivateKey:
        'fa188629a623c13cbdd8a3179714072e81e1ce9fcb761c3835e6332119cb2c1c',
    },
    {
      address: 'cosmos13nh7h8fclnwt8r5dhpukukhu2e046q03v7h729',
      pubkey:
        '038eef9c0211e8d73305211ff9617e2b19258ef9e2396436ad5f7788c8c3af384b',
      PrivateKey:
        '486450817f827e6d1d6920beb69596bfffacba2f0e7955883e03f66c05e3ed77',
    },
    {
      address: 'cosmos1ha7daushg3g7zvc3zys5s4gpd7mdc4xh3xhglf',
      pubkey:
        '036d2f391184476381ae4a724600e791a3eb259f5eb8111db5ff6f78880ea7d7c4',
      PrivateKey:
        '80d98695783186349c8a92ceaebfca9f7f7dfda27fbdc4313528d70b635ba4a5',
    },
    {
      address: 'cosmos18q86drjk93rmx5nejgrhhvk4vtqgurrvrswdg6',
      pubkey:
        '0354ac41194c1095182e8ef7cd48b1210f4d0d0156c6c8e71adcced4caccb66c1e',
      PrivateKey:
        'e5bce59b6aca2477feeada4af32c7ae8c54137aab9694c6b8c7a88d2ddabcbc6',
    },
    {
      address: 'cosmos1fun5dsadv203pjuss7afcqrkvvj57ktmg2gl2j',
      pubkey:
        '0387978f07be31f16139f76d3efbbc76027973a22abc98e6c7898594d565391a27',
      PrivateKey:
        '2e3e13b17425d1f333c424c004a2e42aac3806550cc6e610f53d8e89f0884d5a',
    },
    {
      address: 'cosmos16gpk040mzfyvr4c8xv3njt9ktfjcwnm0szpr9k',
      pubkey:
        '03f6f18441352d47a40c26f83bc4d4ffa2ca7689af10f4e8aac9e318d9e34e31b0',
      PrivateKey:
        '763aacd5e829b679b8868630de735447f82912becee0f9f0973407d481d674f3',
    },
    {
      address: 'cosmos1ewugq29qd78gc8ytkccvzsvwrz5s3c7459cx5d',
      pubkey:
        '025128eb19f589b0dbc30d2f4c5ce51201be55e5af033eeaf1d1255dc614e7ad28',
      PrivateKey:
        '206a88273ba6d5b7b7e6bea4529612955fb6a5464d9d5a0fc7c12ef6e99eb03d',
    },
    {
      address: 'cosmos1jzj8crtj8mj8m7hjjpwfelj9cwu4v5ph7t8759',
      pubkey:
        '02bf62151b1a0a3d0759015df1307ad49a5bd52f22be7081433173db8e8e79c3c2',
      PrivateKey:
        '0e80175529b75516fbd20aa431bf6a0213d30d4d638f8b75ba594d7f73d9a440',
    },
    {
      address: 'cosmos19qn7w4d8k0pdt09um896yz03wqppx7dt99t6pq',
      pubkey:
        '026b311e4b005a8cfbb09a4d1eebae1f68dc8b764dbf377ee647db86ffb610d849',
      PrivateKey:
        '0761158a0a15dc5d314440030e42b261a1ffe03096bcc85e0edf3ad8cc20eb9e',
    },
    {
      address: 'cosmos1e37q6pf6e5704nxzya7l0h8lulgguxgmzhxyar',
      pubkey:
        '03a212bab29701d5c4e5884da12becc3697f398bf26edfe18a0e08486fdd4a2552',
      PrivateKey:
        '17a00410ff5f2741e8b0662e571e6f2a078a1c27d5bc7b1f1186edc732549cfb',
    },
    {
      address: 'cosmos1g0t2cp9dnrqs8gc0aup6www3g5vtpveau897h0',
      pubkey:
        '02764f7f38cb036d615960f615cc1e4e708d573a1a818f9b08ed8649510e356efe',
      PrivateKey:
        'b54a01f80b518be9202571a2f80abd4eee082051bc2ef4057c43ce2474eb6032',
    },
    {
      address: 'cosmos1n5t0a7ye9p4gkd49kjmzlvu2z83w33t0r5shs3',
      pubkey:
        '0219a3bbf1808cc2f20111ffb2eae35ca094f86e6a03e2008138b6233d68f5831d',
      PrivateKey:
        '91a1455eb024193bf5794568705eea1ac3933048d3d2da2259e10116c07a78d6',
    },
    {
      address: 'cosmos1r4rtgksla53nvtvadrs8xz6chh2x3c3xqqe5zh',
      pubkey:
        '024c666f24dcdeff3ec936def9bed8191a0cb3de01ae04b8a3703219f6cbc933bd',
      PrivateKey:
        'f9bbf2840acfea4c0f115f1447f86b053a5dcd23e49a65c757245bc9ee72fbbd',
    },
    {
      address: 'cosmos1ty22cr2u20f00uummxsarmxpthpyw6yxpnaznd',
      pubkey:
        '037ec22de0fef5fa92c976cbe69e2099fac99b0785bd3aab3f6cba5a20a1af06ac',
      PrivateKey:
        'e3bf162dd76c8debfda58a17c750709d6807255164f86040a67a71401b258e1c',
    },
    {
      address: 'cosmos1506wgx8tsnq2ucw4l0t42wrmzh7jvj0rhk0tfv',
      pubkey:
        '03c55b59600c16579874989e2f26d3bbec2e59c6dbbf32879f45c80ef0f77277e2',
      PrivateKey:
        'f4d3500207cb347d89df8280a0009ca7f46bb85f3274e2a6fa0aea1b2200719a',
    },
    {
      address: 'cosmos1j6l784hg8n6k74vt0j2zte8dw6g50tqhs2zwse',
      pubkey:
        '02882347deb21dbea3222bbec4983c5b77045d070b539e844e0d927c1f544ef83f',
      PrivateKey:
        '588e5b2e0b9f274494900dcacd62181f8b86273674d957c3a1a512888a091c49',
    },
    {
      address: 'cosmos1elmknd7a2ra52wzuc9qx39wh0wxpfsa87kqjzj',
      pubkey:
        '022cc7ff5ee52919d6c572520c0640653921958df7d5edfc6b72c6fe29ba3ceb53',
      PrivateKey:
        '4351c3f30fece8cb60e7a0576c1dcd7d597e84872bd74c2db8c4c39777e20e78',
    },
    {
      address: 'cosmos1sx930tz84uhqj3u5asn05fhste0rnu4x6tmh27',
      pubkey:
        '0259d1867f8124f63593a2e978396596320b63da9cb0e0e4f08e57c9fff30ae68a',
      PrivateKey:
        'abf03beb84a9bc1845e4e9c262cb7fbdc5844f0cec2247a63508a93483382dd6',
    },
    {
      address: 'cosmos1wppy9l9pwxxstzkmj4tp4al0wqdaw3yw5sjnzq',
      pubkey:
        '02d6c7a9de162cfeda795d2b5244648b4d7287356ed8ecf5727fa305072423f8bb',
      PrivateKey:
        '2f664b903e7129bf70cd733120b3b23505838cdad079da812d0c14699d705ae1',
    },
    {
      address: 'cosmos1aygtvx4gcmrhwvyjep460exy6clh53k5mdh7e8',
      pubkey:
        '0228d31feee7ab67148f461d9b6547bc0758a1f10076ead47250536d142f894898',
      PrivateKey:
        'f553d670996bf058541adb7e45e21c5e615a6f9f3330481663d941b97569fe0c',
    },
    {
      address: 'cosmos1scuxxvj44l20t5c8ckf7hppulshk8ayetu73vk',
      pubkey:
        '02ebb8f66b5912b500cb54fdeda08d647218e0d858acff225413a6234cf8adeee5',
      PrivateKey:
        '7c10fafbd65f0c755dcf28a5a398b693d27d16ac1343aac8d11360b40934a439',
    },
    {
      address: 'cosmos1fftcfx8ypp3ujmjydvpfvazewys643twvzspe8',
      pubkey:
        '030e40388f8ec0c292b58b6349eb93906c0720b3221ced41b223b7e27dedb18212',
      PrivateKey:
        'ac44618a1e013fab8357d00f2089c9071646c3d0e5814673b0300f958cd37d49',
    },
    {
      address: 'cosmos1s3h2uas83g4427j0l5l408vl2mem8tn7f7wjjt',
      pubkey:
        '03270f0bd0d88ff467dd928bef47e37e107012902bb46dce6f713a1fa158e4bdd0',
      PrivateKey:
        '310acb6d7f25c1df2877eafb78089b743785099b49aa8236842d048b1206932d',
    },
    {
      address: 'cosmos10cumxkpdv3w6wxg3sum270j08c6cqmx7jzgvg9',
      pubkey:
        '036f494604db9429e7abb2b7c6fa9c42e34426d558c37b425ae6b8a7e4c678a7cb',
      PrivateKey:
        '2c04e7bf63e677c9ebb563c12d4efb8710335aa74422a5425eb362be7d4d5c97',
    },
    {
      address: 'cosmos1jjgjsfdzsvdzhsj9duwx9pl4pppn60a6ydsllm',
      pubkey:
        '02d5bb3ab8b21417bc0e328943ae235318c26a467ba875de6401861ce0fd5a4c00',
      PrivateKey:
        '1a2de0c688face381e42ed8f989c0dbe59730c8b4c236cdb188facb50abef09b',
    },
    {
      address: 'cosmos1q5p464x5w327kaem9etv2fnshftvptzn4xzzdm',
      pubkey:
        '03618548528b65fcedb1bdceb1b11dec7b2160c31392d86c2adb5461063e7495ff',
      PrivateKey:
        '59995ce47dade47fd40d86eefc34b07d9539e58dd7f9e0574d76211559d1b94a',
    },
    {
      address: 'cosmos15rqrl2mk5kyzde9fzwtmazchw5f507vr47ehju',
      pubkey:
        '02c7df1bcd402e4121a2d58f8bb2a3f364bce56b0e23730dd8cc780186e220aee7',
      PrivateKey:
        '8a4b4345cff61a0b0c2b8f528fabea7c85bcf8bb7985a154944dec80c4236108',
    },
    {
      address: 'cosmos1x084xfgql4pfetl5s3a3waq047ddxzvmg4m3s0',
      pubkey:
        '02f25369919fef60c0867649670d4b39f64abb7f680f77b090d4369d656261dd41',
      PrivateKey:
        '253159d37ebf887a9bdb697bf7352bffb250cb61e2d3739ef7a8ad272cb2cf80',
    },
    {
      address: 'cosmos12p5nm5n48px2hy74pz4slj6wwdjxql0eaftr0x',
      pubkey:
        '0390791df2b3c6f3f4adb77fc5f386270822034117409ea57ffb5eb7e0aa68d79c',
      PrivateKey:
        'e9bae8234089ceb93259344f040ca1e056b736f25d1fb42ff715ebcfddba9892',
    },
    {
      address: 'cosmos16pc2et2gwtjkqmldt9m3l0nyfurk7suzdxjfuh',
      pubkey:
        '030d5edf6b282737abf083d53a75df5c1d406dc0c8d0d652098fe26175a0c20ac6',
      PrivateKey:
        '0e10258e59ac5ed485462a5c1dccdb5cefe1ddcd447b55fc4203eccad0ad5418',
    },
    {
      address: 'cosmos1eftj7h7smth00qhwjhwjs4y3zwqmpmagynl5z3',
      pubkey:
        '026be7dc8978e66b184e9baae5eb97e827b668de3ce1a69f284274d78bbe9d8a3f',
      PrivateKey:
        'f4d4f194e39ac510290bafc0a9ebfb9f86994ef7251b554f07ee7c3062b93204',
    },
    {
      address: 'cosmos14df4ft0nvgfjs048s6n3xy6fwdmkz0zme0hmx3',
      pubkey:
        '03607040e17ed77a9a943c902e89509b04389bc43c5d7cb6d18cc12c8ae7d4149a',
      PrivateKey:
        'fe386fcdbd8c5ee4f468e35c60e0c4079ed36eaca00b6a0416f15b1a7e4dd74d',
    },
    {
      address: 'cosmos18uuxnus4e5e6msr27ulq5q62xn6r0axctaslwy',
      pubkey:
        '02fc41999947ff6bee40a84dbe8a35bf825015e4df0eec3865f8a4dc55690e87c7',
      PrivateKey:
        'a76d05eb4a5504db77802722c8067d5d1fd1c7753572fc87ad4e16b45e2f9feb',
    },
    {
      address: 'cosmos18pqu6awlgvs2ejvcys4y63we3k5yf7nn3t8k7z',
      pubkey:
        '02dc037ab9237110a242efe2fcb86df1e9b45c8f14ffe4af70d478fe448f41f9ea',
      PrivateKey:
        '655fef8e6072cc91417552d8d7b1b392c3f4e0919fdb5dd2f37f3e4c2ff93692',
    },
    {
      address: 'cosmos1km55eedekz5te9am2eguqyxu9sm9ksmtqswcq2',
      pubkey:
        '024d0071b6595c8917afc78a07bbd337c51c786d55f37787e1f3e4c5f73fc2ceba',
      PrivateKey:
        '07846a49ac2e41d8ec0af2b165852ade0c8125dc0b8a49861b9621ed2de6f3a9',
    },
    {
      address: 'cosmos1xc44uefv0nu63fxpqxtfwlex6qzaeqqv2xwsuv',
      pubkey:
        '02e28127e0853143fd875ecf4e2444e4a2946ebedec27a8a7d17f79eabec9233e7',
      PrivateKey:
        'fa843210b33d68ddd7b0d2248721028ac6c6340085a48c3c6c2f8e259f9781a9',
    },
    {
      address: 'cosmos1fek6y3pzwlql78g77fycw9crvfe5lv30s38mxj',
      pubkey:
        '03c3f932b2e394589564b12685cc4cc27d362fbcc03900188becba2d792f9210c2',
      PrivateKey:
        'a62ba6d9e540fc6ed0e1d24967fd60ae330a08979fcae4e2265e6bd6cd6a9b53',
    },
    {
      address: 'cosmos17fa80stqx3jxr9mef09u3a9qfx0ep422ms0473',
      pubkey:
        '03a2d9533d71cae0e05be6e0c62b9b56b7086ea6b206f44db31366949bedba1c28',
      PrivateKey:
        'c6eb60c2b6c3ef634c385d4eb0e8e97deca208e087a7778a23fd6d765664cbba',
    },
    {
      address: 'cosmos12fgqghazggwj6nyksrx4f6v42k5wsmkyhx0pc9',
      pubkey:
        '034c0a1ab245a4ec93c703920fd52b78e73fa95f8ad4294ba0bcdb81a495eea66d',
      PrivateKey:
        '2035a1a28776d5bfe9b571c0fb637854977bad25e44844e63adf62b0f92af603',
    },
    {
      address: 'cosmos1n3xvwf9xvzd07t0ctghghtuzusg5p04apuffz9',
      pubkey:
        '03c9f55dd51d23d0896cdcb94c181e68461249727cc3f38d479894733b39b85602',
      PrivateKey:
        '06d2ef1dc86e6e5bc54b4b811095a2f701f7e37d4bda36dfa5d2880db5dfe8da',
    },
    {
      address: 'cosmos15pvm8033egza6yzlg232e0k4anrlf8w6eff5u0',
      pubkey:
        '03e6daa22b5dafd59e72b16585d64d9f3a9f98ace11f36d8fb103f844c65f03c00',
      PrivateKey:
        '03c62751b0e46133404da3e163b4b6e4691f2811f3d86f860d2454f1eee21a47',
    },
    {
      address: 'cosmos1hz57jnwywqu6upy0968665ehd3jsekm0ww6cly',
      pubkey:
        '030e6f0510cc62f47a537080edd37a02b23cd5a748c11deea377d9463a03239cc7',
      PrivateKey:
        '621e01b28c966ee8d5c3d375d723bbdd2932ad3e8b3a35a98d387e6725e967e2',
    },
    {
      address: 'cosmos1w455h3rfusrfa9cu93vuh4ev6nfcjdn37038dl',
      pubkey:
        '020f6c6c5f9c3969a38abd03756531250d4952052bcb76e3527fc43db021cc72c3',
      PrivateKey:
        'a806c21d5adf822c5b3ff6ee7a119d6bc5af8241cd714d71adf8519f2850da4a',
    },
    {
      address: 'cosmos17na4au28tsxn9l6ph8n7c5qzh5u7duw6x92tlc',
      pubkey:
        '0223c87de917269a50af6890df7c0af40b7022587adefcf413b3883048e1d64b8e',
      PrivateKey:
        'cfca3c91e02bf7444db842bb9f2626bfbc86aeb0daa1357f07c5f6e786a5a75d',
    },
    {
      address: 'cosmos1cnvr5ncjfwc2zllla803872l56puz29wcnmexq',
      pubkey:
        '03ced9eec9ee03ee8f959a3ebc218a749d39d3fc680f4adcb6f7233722aed4d8ea',
      PrivateKey:
        'cd430f30f2868f5ca91ce95a4417c3ea35d8c081ab6d100f65b5ecca39ecd0a3',
    },
    {
      address: 'cosmos1r68n9r9uqjl5527rtk39xywmn0spfda3ujc9e0',
      pubkey:
        '027f0239aaa99d9c74f94cb2d1468e2cd6eae2a388a252297039bc023abb0647e2',
      PrivateKey:
        '64f57afccdaacdbafeba1aaa5c265721207f758b6b38baa3caa0eb9405e51525',
    },
    {
      address: 'cosmos1ckr6lczs3n9900v2kfhnk94dpkv54rxe8nt0dk',
      pubkey:
        '03661546138b4f588ad0f87a1e57279f8f94074393a4b1c90c2d906f881463981d',
      PrivateKey:
        'b24d304093294f0900622d7647460e61cee1327fad12b7e466d29013a5e69c99',
    },
    {
      address: 'cosmos17fkglrpdunknekt4747e2096pq90dx2upskhvn',
      pubkey:
        '03d36e025d2b249f873a0fc409b3906da8cc54654d8b030a9c5e74c90ff6836035',
      PrivateKey:
        'c16a7273a295a9516b3cab9ad8c7476cacf4f3260dc8b130bce0996d1377bc98',
    },
    {
      address: 'cosmos1h3yv0te3nmsqhy9m60lqz4n8cv726ph0n2593g',
      pubkey:
        '0259fc7372a8a68f0181583dbd305f2c5ff401440bb9c09c0e6736422c3ef242db',
      PrivateKey:
        '3b1493c6d28683f5b69cacd6d75cb98310409196cf188f5d831654c0b98c1a7a',
    },
    {
      address: 'cosmos1caew0zfpc7dwhapcyekkdv8e6p9x8fv4q0hzps',
      pubkey:
        '02a123fcbb889890a210576f1a6947c4d3fa457a65688c12ca86f59173051cf703',
      PrivateKey:
        'd57b7faa07bd19a22ef88716a7e340418bd8ed34c4aa2d9157fc6644163b8da9',
    },
    {
      address: 'cosmos1qqf4fmjj83hcrt7yyncwsjkntemyd5qvz93wnp',
      pubkey:
        '03c5f6b207ba7402a65c2cad8a747c8795026ccc3316297ac22ca5f926e579f575',
      PrivateKey:
        'b27fdfef95aba243165408a1805d909da4e7e2fd1372fda8a1736dec3c6147ac',
    },
    {
      address: 'cosmos1lhmfxffmsa6jj72y7eezd3zgynm05eegzuhne9',
      pubkey:
        '02a645ff11ef4b0612ce26bbe156892052687b73873be74d63354014a4f1c58220',
      PrivateKey:
        'ffeca16862a7ca442c3bd632652af665705a74111ed574b8ea71d29d506b1e2c',
    },
    {
      address: 'cosmos1vapdk02xqx4n8vqnmn3umg5vaprwpatcgp44aj',
      pubkey:
        '0366a3c91ee8874e5077dcd28f478b960281478272df18accbbbc8683f94ee230c',
      PrivateKey:
        '464698e7e6b2633f17ff18f483df6f532a64c8d58fa30dd755be6f62ff47eb9e',
    },
    {
      address: 'cosmos1y9703977pa56r47pq9zhjs4qw748pw03259t32',
      pubkey:
        '02833e139b01580f023909f2b0fccda109061192c948e822cfc64e17d75d7f075f',
      PrivateKey:
        '9fd2f2ffd302bdd1999b0b8ba09503676799d168651bd04ca76a9b58293b0c34',
    },
    {
      address: 'cosmos1ayfuu46dtkpg2k88ueu4dfnr288k2jg927ht3u',
      pubkey:
        '02ee1e33b611d6128ce5999543be042142880ff4885cd406af029ba3bb5143e08d',
      PrivateKey:
        'a99759a0fb4100d4f2146af5d87fcb469a795a7e615c01ff603e71fef46bb714',
    },
    {
      address: 'cosmos1hs7rsl0rxavq27ne4pem9229ug47hj7fspsqg3',
      pubkey:
        '02cd54e4f0d07046e27f2e251f985df200164dda92eba8e80580db36104976876c',
      PrivateKey:
        'f26e10ef23d1cce7e0a56ad28c697858df7fb44437805fbb7c4d23113227d4fc',
    },
    {
      address: 'cosmos1naml3uhl6ntvdwmhx6qe3nwtks5spffx5kuyme',
      pubkey:
        '021c1e217bec50ce67288fd044e996f49ced1acbce961fa20f5e17e7a5b9f66823',
      PrivateKey:
        '158222b0b38bab234541336474a739cabea62e31a4e2f377b1d2058bb38061b2',
    },
    {
      address: 'cosmos10pe2rv2v4vqu6e6xy4z8rycu7cdstf0fsy8nyx',
      pubkey:
        '0376c5668d89a488d35173f2b9f26e591cdede202716ce6a83480c2779caafb0df',
      PrivateKey:
        'abda2dba7c8f61658bffba356aeb0ac634a0735b005cb8d9ad7f3e50e978dd22',
    },
    {
      address: 'cosmos1ln0n27ccqrtxp9nzvzc9usetzfakxvv9c6tsnh',
      pubkey:
        '0383f51869dc5347a2c458603e442842e7b775c1eccb0d0c519abd0c40762ae962',
      PrivateKey:
        '65d58314cf8d6a575143bd2f1871097579c702babae788c6e6431621d881951e',
    },
    {
      address: 'cosmos19n8gagc47wsytaff8shmdltnawlhescf75dpqu',
      pubkey:
        '02e1e0eb9a805be029beda8fbaeac7cda4b6ccbf1d19bb0ecf2c29fd547caee1b1',
      PrivateKey:
        '23a25c769b2ca1d2a2e42be7c6540b1209a02f9fd7104a27cba902d516e62971',
    },
    {
      address: 'cosmos1h7pz3lvu0chxuw4rujea3h6pv7xggff7fx9vnr',
      pubkey:
        '0392d51c78322271106531b92158dc30d155df12fb85e18b57f13e1ede89cc5c4b',
      PrivateKey:
        '8ad785471057bddfcb63cbaf316faa1f86b194b7563755feffbbdb45d69e0329',
    },
    {
      address: 'cosmos1saqtl3yamya2ydu2yrfgefdrc46zjvc94c0gph',
      pubkey:
        '03c0461030e42e29fd97fb01883fd3923a55822921888e4bd3353c9b146bf4ba4d',
      PrivateKey:
        '76198cd7eb5f82de5e6ff5d11c6b1afb025f04d63c89e64eba5c045f2163e9ab',
    },
    {
      address: 'cosmos1ye8emy8x4llqrnrltgvjhuus6g9z9c7rnggja2',
      pubkey:
        '02799c8c3938dcc03709aa348d65f36ebf55c36fcf5ba1c2c8d75345819ef9e796',
      PrivateKey:
        'af107daa1128f24a61c3759dfe19fdb697b563a7425ab138d585bc7583474e7d',
    },
    {
      address: 'cosmos1nw44lvf7s38hrywq9jasv682vvtq2w8gmn092j',
      pubkey:
        '03072528633c3fd0c78b184a7715a2bfa150e76979e46782994c0e635dfe004847',
      PrivateKey:
        'bd3ef2f77c081294aae50b9226f877f2f653780f50c98dd7f6ca60f102524fc5',
    },
    {
      address: 'cosmos1kjd8rw8qae6dx6eud009nprspl2gkh5nnl6q9v',
      pubkey:
        '03cf99c0cdcc522aa5b2f6436effdc71951f50625649ca434c5e6a777686312519',
      PrivateKey:
        'c02acb43a21584ddf7d1307cb2c248e65f894e474ac4a4cbfb361fbc6126f330',
    },
    {
      address: 'cosmos190ckj6v862jr23fq4mfdraqamdzhs5knreqgmd',
      pubkey:
        '03de558480debd2efe380759b49efd71d3914f1ad7dab45dee1aa6dca0c15b4b4c',
      PrivateKey:
        'f5cc72debdcfcb36765f4834db5aca02d3b616e3cf431273ba7c59b8f0a2c3c3',
    },
    {
      address: 'cosmos1dzr6h3hsew4zc0s57mpyxuugv6zczpkqjcm694',
      pubkey:
        '030bafbe74f280d44fa7488ae9d0eceec5963dc56fc39ffb68767dda8fa8424085',
      PrivateKey:
        'd2c87aea105f4b408fe6c0726d1bec4545f0be55dd30824638c7387f0f8cf7d0',
    },
    {
      address: 'cosmos1t3qha2eh69dn6gv3tluun3maxtthfe3nm3wxxe',
      pubkey:
        '03eb60df0d60f09be193ba5ce0f08b6d7927d6954584aba050ab4f748d18246493',
      PrivateKey:
        'd7c00dd43b9fde34c1bb5c80392785515b034d5960a10961935525ae912ea265',
    },
    {
      address: 'cosmos16upwurme2q2z937n7xr952kzg6vapx4gr205xg',
      pubkey:
        '039992396217e05ca50c9a420039f26b5a6ece2177205bb20ef15ae9e253f903cf',
      PrivateKey:
        'a355c96fcd05cac6175e3c6f5d8e3418aa0563f05a3b060f40c3eaa67df9a8b4',
    },
    {
      address: 'cosmos1667535h9dt2a66utlvvxjpaqyg0r0dgclxs4zf',
      pubkey:
        '03fecfac6db5f87d0a32d83b9b6eb0e383cfd76da5cee8823c89a1ff43283f0eac',
      PrivateKey:
        '6bca726e592e654ca8c4133fb192d5a71ef0f07ccebb298b582b0f5bbc63c5cc',
    },
    {
      address: 'cosmos1fzv48wtgg730rv6045gjeskykv9p0f0c2uxqjq',
      pubkey:
        '02765354aa142913509150dc70cbe4acb401b9b313f2884d2b9ece79b87c6b5335',
      PrivateKey:
        '789d8762a300afe025d8150c7625bb97f1509dfed242fdb7fbd2dafd61b03b18',
    },
    {
      address: 'cosmos1603c9hzj83ze0aq5t7r2dnujcfdlz3xtq83mpe',
      pubkey:
        '02835d20b93abfc5426133003b3027ab11a269a37ac6bb45e2ffb61d803a16772b',
      PrivateKey:
        '7254b21b9e44f808e50234d3adfce399cab4c917ff9e6e8ab1820d48d6d36158',
    },
    {
      address: 'cosmos1ul4msnhddlvxczcqug5ntt9l52a8za0xhupzgj',
      pubkey:
        '0275379d980b678acb8a2bb2a8ad6e44fe8f18eadfdc90024a9940882a6723cbd1',
      PrivateKey:
        '34cfaed9ecf62bfd6c953aad1d70ddacee5cae3863f682026b880df6b43d43c4',
    },
    {
      address: 'cosmos1x27559ld85nyvkkgru2dp27r4l6ntahz9mf54d',
      pubkey:
        '02065e0d66c5f6559c4a63336677f686825b53e96866fb5c5f7a22a3a331ec57cc',
      PrivateKey:
        '830bdc85d447ab57293a1c4f8afb1ae28a1cce104eafd06face903bad4d68af9',
    },
    {
      address: 'cosmos1e4d4p9d5sfhl94atyh4sn57s3k2r4flkmsd76p',
      pubkey:
        '02bf97fecdd383675fb439f939eb44e7309d1bda65d3042f6ea259bfcd7cf3096d',
      PrivateKey:
        'e718e1f156007c063df46b5f5e836cb9e94d91b8a73ac6e3b3082db863119558',
    },
    {
      address: 'cosmos1yax8mzpfq84umd4k695mmg5zc5rguguuwhlrdf',
      pubkey:
        '0338ee91b29a0b2a5658a0f26463921cb0ce18f6786beb2c7366cfe918d1256773',
      PrivateKey:
        '0dee74880f260a3541af11be7bf824e36ad3a835fbb52e1b1ecfce9400d65c14',
    },
    {
      address: 'cosmos1rnctl5qkngw0x04m30w5xk80txm4v270fhwe0m',
      pubkey:
        '027c26f52d8eb45634ea6dc9654b7a4f6cdf2e9c24a453952598905674f5219ffe',
      PrivateKey:
        'e90be07c63081244d304a58143e95a735dc6262b0ae2cc14719b6dccb6d8043d',
    },
    {
      address: 'cosmos16stuwhgcgcx7qlm0fvj68jatwckxhq43x9p7a2',
      pubkey:
        '025380871fdc271ba6717e61351d0ba512cd6e774fe88d526d32109c344b8b6364',
      PrivateKey:
        '42d6cfc9af60a9a6f90df361782d1c36b2710910c06b799c31be2c59034bb7dd',
    },
    {
      address: 'cosmos1e47lgvhgmr2h4shw6yj2mwqcl5llfmff7427ec',
      pubkey:
        '02fce70fa835445c5ea089f8fc6561ee3569a06675eec45f660407db2e8ba92435',
      PrivateKey:
        'e7d4a17acb181db5a9c1af6c80c58160861046cea76732c9ceb28268e76b640e',
    },
    {
      address: 'cosmos10qevkxr694exnteryh5xymel2hhlfhywm3crmm',
      pubkey:
        '038c2e252dc7535c7f91d03d464372cf40656813c151c83262c6744f927610fbd4',
      PrivateKey:
        '4dc3ded987fd31d60d5441259e660a5071a61e72da939bece41b126494e1e0d5',
    },
    {
      address: 'cosmos1hwly95re3jy5ue5yngp35fe0a2e5lvf875m7vv',
      pubkey:
        '03bbfb0dcf0e47f3e68700b9f8a4f7515d5e6a3ce58c5accac50dc9d3c4d102729',
      PrivateKey:
        'a21c8d478f9b589371113dd104ced6355e55a39a84ea1a419ca5edb9418bd663',
    },
    {
      address: 'cosmos1a62ez9t0p3qz4wrftdvuyd257t5gz7z5cdtugv',
      pubkey:
        '037ee89ae8f620b83600703a6a35864ede041609547370cf76845d6ac58dd27060',
      PrivateKey:
        '2ed377f04f44a975497ab0dfe6903e7783366b3798def9f6d2f4e1cbb7d17e7f',
    },
    {
      address: 'cosmos1samzv7kangk9ade4nrznwrtv28wy9mqnvqr6yt',
      pubkey:
        '03aa62d4b23c3e653586c883689aef9c554918973bfb89cef89484752b709fb0aa',
      PrivateKey:
        '8ba5d26ade81ab0ab767215171862589567250fc537db20504dff14289b5e0d8',
    },
    {
      address: 'cosmos140r3jmxzpx3uwgplvu2tp0uuzfq0egch8uyr3p',
      pubkey:
        '02948906b107964a0b4e517b670f9ad10a8f751b0eb49b7b1b103611221326be18',
      PrivateKey:
        'bc1b07147f4910d26fabcbebd3fad79a8d27c4e70666df3e91934298c6ca5cce',
    },
    {
      address: 'cosmos12d338qeypdfhtcz4jdj4hy6g047ykyz86ejl7e',
      pubkey:
        '02ad2294fad8e5cdab545b2d4dab07b5d34c8fb04c10984cc32828a5fb23e189a1',
      PrivateKey:
        '59151e12c3e27fdb47e504d4730216aa491ba0a8267fb0e1552d41dc8e90c316',
    },
    {
      address: 'cosmos19lvcc3lzfrsyykttmnxdpqhc3ez3jjcvsvqjyr',
      pubkey:
        '0293079454433bb94f0cdb809e3adfde5ab35de38aa55a9d7651b010512bb86b6f',
      PrivateKey:
        '66c7269114b573d3df54320140fdedf10fe74104ccdd41e986a35753a59cbe59',
    },
    {
      address: 'cosmos17p6f9dq2zk6xlgsmv4dnf2kk5x75hf8p36am8f',
      pubkey:
        '028afe8745c7dfb718988ae4eee92c9e60347997051fbf3784ef038f832cb0c847',
      PrivateKey:
        'db759fd5676f6969caa9634fafbdf67eb3ed139493777b19e19678d32302598a',
    },
    {
      address: 'cosmos1nmktm29vhth8n9l3pxv60kerg5jhce7qzxfetj',
      pubkey:
        '02661e0a11eaa0236f7c9d2e1fee2ae85f759317ed7533993f27a80ad7bd018640',
      PrivateKey:
        '83c1716a8372ffbbab78119fa6b1e384de622e07fd719195b4cdb9d20faa8fcd',
    },
    {
      address: 'cosmos1jl5lryargynvte6nyzrqw47dy7e8avh8dksw63',
      pubkey:
        '039babd0b3af84a62459a6446bc61dd079df93ff9f142cf1ddeb7d3d54f172f76c',
      PrivateKey:
        'f0029fe3360e2fdbc16fea2480359859f22e78b196e03bc8f3f738fa52594c44',
    },
    {
      address: 'cosmos19er6tqlapwqqynxxq792dwmrgxs33u046eljn3',
      pubkey:
        '039dbd91f1569777f05f661138e98b9ac453fa1233c0871612916862546eeff890',
      PrivateKey:
        'bad4ff2f80d5beea23d7cc13bef24b92fc5401f3e092604be94d7df044a87083',
    },
    {
      address: 'cosmos1gkfwr6ceg3ut0mt2726j4vyz2qzt0za4h2lrxg',
      pubkey:
        '02dd1db48f7775e68811068fe6d4f5c8bf36ef903d88f1572d3b8941f0f43a5bba',
      PrivateKey:
        'fc8f005903010b46cf611aa5ce50077e2dc7ba35185cc79fbb521bfe3bbcdaa7',
    },
    {
      address: 'cosmos18mszpyrsvwcv0knydeuwhk00vm0nxg3gzrska7',
      pubkey:
        '026dcf0445cf1cf837a405250d4939222b5d2785d26c024377524ecad4360089bd',
      PrivateKey:
        '440ab6521b4966f8f44b88042ff1ee80045e7ed71d93a7f1b68ce6256f1fbe3e',
    },
    {
      address: 'cosmos19pmph6n7dcypc6e4gx6nnnvj0r5p3rq4al6mu3',
      pubkey:
        '03b2bbc5f042e1e5b857b0003b114f38c2505cd4667c704b63e73e3af29a2ba0f4',
      PrivateKey:
        '851d40aed706406c86d602d3c427506064bac7a8421014a7c298711280ac0811',
    },
    {
      address: 'cosmos15u2aq5a02gejukedl58w68sff6hjjyumzfaxa4',
      pubkey:
        '033ac71880a8a5a2c10b2c6fa03ca53636ce3c07c52ad9c9d0a9a4ea64b7046f9b',
      PrivateKey:
        '81c8ce30cd7459bd7cd42fd231c5283f2f228c4101388ff55e70d614184b77c3',
    },
    {
      address: 'cosmos1mpsj27eyczwpkf70ludt3dcxwj0tru57cvtjfw',
      pubkey:
        '0369b655c6522889f478be92aeddcae05af9b1526787a8e1ea79698385cb74d4c3',
      PrivateKey:
        'd89f5c8b29238ef305b797f70e972288bb307bf1cf5b140ae03ecdb7b0b90fa7',
    },
    {
      address: 'cosmos179qncr7jfl7gpy55g66rf8hlywvtjhsaedl2dv',
      pubkey:
        '02ace7c7addd4f294457f36ecaf8d07651a1d3d6b8b415e0c1cd318a926c92eeee',
      PrivateKey:
        'b19c02b524e0f1f3c993475f8381796998c005e4cf9a6eb6f158c98284424a58',
    },
    {
      address: 'cosmos1s87nshv94m76m0k7c9hx46mz0esstgquw8f6z9',
      pubkey:
        '03b750b727f2b57d7dd63ef8e6621e72d34458648ea17f9ae6b8bc81323d6e3954',
      PrivateKey:
        'd7194e8d679da393fcef2cfc8a1cf5048fb9590ec375c9305ef649921db79d6a',
    },
    {
      address: 'cosmos1hhy0t7r84e6v6jqlylwef3kq2lgp205h2322ff',
      pubkey:
        '036856eaa526cad3f48701ea7b514ed444bb80a3035b3a6a70216b915aea9189a0',
      PrivateKey:
        'b66a68fe4de9e431140fc4c08f5d35f3a4fb66060904d4a280dd2af6be07e88d',
    },
    {
      address: 'cosmos17jxp563afj4sp77as4nay383jjftvjnw0e3d6y',
      pubkey:
        '03a70878e419474d07e8c77c1ac3c7ca39ca1074b41c5f7355ad93c828250e0a5f',
      PrivateKey:
        'e8ab44d70b4feaebbf22512f741080e715890d51aac7c9e567903a2b8c5b3dbd',
    },
    {
      address: 'cosmos1dtnaq2y9pe7h5h3ywfxzxwc4vcaxw2xd6vmsz2',
      pubkey:
        '03d2780384919fbf9ff8898b95ca6891633773976e987c5f8207f7118bec089d40',
      PrivateKey:
        'd6b4372c82f0a1e28a86ae469741a61407369104102baac071f92305cc4c59f3',
    },
    {
      address: 'cosmos1p94ncraxeup9guulwc6tyru7ek56ntjqf5u393',
      pubkey:
        '03d177548b9ba64a157d49be4177bc5a7a6202d0c97e1abb22400b480a6db060b9',
      PrivateKey:
        '7eb815e8fa78e95b5972537bfc4200890b4858393ed6f0dc1fd61fbfe7599d32',
    },
    {
      address: 'cosmos1r0xr8mju3dn60kqh7z9t6m2myweyaehg4hn3pg',
      pubkey:
        '036a8d4726472f58dca4f8ee0ffcbbe5134c1c9b6bdd7ebd17b141e1a9c400136a',
      PrivateKey:
        'd483b616f69321568bb4d194e84ee0155895225dff40e82778cbf39b332f5df0',
    },
    {
      address: 'cosmos13efzpd7gx4c0gzjns9fxdlldrqwv0q3rrkv2wf',
      pubkey:
        '03ece4d292586a38216f2257c98a1b1a2e48402241981cac27667532a806fcc969',
      PrivateKey:
        '62b465244f0221e72530bd8b04c42d7d1ee6d7e289c3e68389257d49218377eb',
    },
    {
      address: 'cosmos1t83x0ul84vpqufm3vm0grss9vxe5lj2nsd9x9w',
      pubkey:
        '0383abfed0233a3d30fdbd0b1846ea2eb80f65124bf36dd01e7dbb91d49f6824ef',
      PrivateKey:
        '51d7151804136afdbcc6afb41798b8538d0481df20f2628c0b9cbba79b2bd163',
    },
    {
      address: 'cosmos1c6znljw5kscssmefm242z87zhxk7cf43865npl',
      pubkey:
        '0360249516daf658d9f0d0817c2828b300c9cdf137e7e6c68ca3b01ccca9d4f3c0',
      PrivateKey:
        '68df319e9f802957379aba72980d11ce669b05a7bb70c6bc2cdaedf3ddf955da',
    },
    {
      address: 'cosmos18n828nxtvg2m2lmnja77kms6rlxpqkh43kuw46',
      pubkey:
        '02ca4895fe71e69b542f4cf63ecdbca652f79adf67a2d9f305e78d10c46315e4e0',
      PrivateKey:
        '7cf675a3efb1ecf86fded49399fde700bfc8ee99fc4517b3bdab0b53ededc83d',
    },
    {
      address: 'cosmos16x86u2w97a8jm5y3qcp8d40x72n6j2ym2ctd2f',
      pubkey:
        '02cef95130b09a2697251c297c412b66ee27dfff7b525e005a55f147b324c3559b',
      PrivateKey:
        'a527a6554f673aede0f291231edd38105fb7242e2fd9d149c7db5fc6f996eee8',
    },
    {
      address: 'cosmos1fknt3kk4fr9zgvayy9htg7hmyev0az3mzeq3vr',
      pubkey:
        '036b9d04f5a9ca7d54d8c74b8a7a5e441d064ec1f6d660251e404f53592f6203ea',
      PrivateKey:
        '3db56c489f65e38be0da324fc7a49eb64426693d5a44bd2db36d98945ca0b828',
    },
    {
      address: 'cosmos1ej0lxlgpshafmvuwy5x435sc2fw25krrdzm9ly',
      pubkey:
        '0381869330c53f8efbcdba019c9cbd04e1889dae1ef7c5704f1f760e83c4d3eb0c',
      PrivateKey:
        'cd955fae524892fe1a40d2bed85fa1bf3729deea4d1a357d163cd4ddf4fc037b',
    },
    {
      address: 'cosmos1mx0k73s8yt6s88pkzq3msjjdp3h7lc0u6mmeur',
      pubkey:
        '020a7d4bed93cb7ec578dad29ebd0998f49456f32272e71730057e7199cf758530',
      PrivateKey:
        '54bd1889f67c76c9f6650f563aea69c2e83e8e34fdb743d0c625c46e3999cac5',
    },
    {
      address: 'cosmos1nlgvfa753fays98ajp72qytdsshlhee8uftveu',
      pubkey:
        '02f9f4a5841f8832ffecae250d4e78677313a13ff1211d8ba50c12b74594a3dc71',
      PrivateKey:
        'a4c61e5a74d3e77cbac186a09bf5fcbc34469e55e0281a7991abc3f01207d50d',
    },
    {
      address: 'cosmos1ft7gvxcha0zrnjrph3gsdrvwep076cxluk50sc',
      pubkey:
        '0396426fd3f12ef9a1d7ab35c9fd948633b6dde91606674fa6ebbc1748c122d8e0',
      PrivateKey:
        '34686fa4dea50a9cd2d9f32a8a9f31d20a2aa0503f70375c6cf47b4c69df69d2',
    },
    {
      address: 'cosmos1cgyrlw3z8hh508w2kdvcgmwfxgaqjd8uhhyydn',
      pubkey:
        '02af01bfd79e7d8b91a9c24fda76238024bd44a9f18d96c4b00c2326594864bec7',
      PrivateKey:
        '7df69da38619994f8b2a0de7565dd245873de27f80514d2f20669460f7bfd659',
    },
    {
      address: 'cosmos1c94p4e2mtw37k8k5536rrs3faet4vkc5kvktwe',
      pubkey:
        '03107e593b8db795904b2087f6c1257b7c03c2df41b6914d767ccdecfd156e371c',
      PrivateKey:
        '17df81970ba1d338941c9ea0e68960ab44df27423fb68d4a55752d691d8085b2',
    },
    {
      address: 'cosmos1z5n0f3phsje6e0qn7czz4dfq5kg68p7f2e7h7e',
      pubkey:
        '036fd9f3b4bf5749ebe8a4b7dec0f405c7d931ae9ab7a483426aeee87e541cb9df',
      PrivateKey:
        '6d1507872828553ae026c0b8402dcb311fc7b9240776c826c9271bfcf9b3e78d',
    },
    {
      address: 'cosmos1aqcjfw00cake3ufzmavn92uje979wqkmmaa9gx',
      pubkey:
        '032fa0c930b3e520e54cdac4a691697df0636b0da4b283e56013ce0a3b19edb83e',
      PrivateKey:
        '4eea1db22c9a1cdd26c85b568cdaecef7b8f0cd9dbcf25f1644db958c2f570d2',
    },
    {
      address: 'cosmos1k3ptra04cj0j8cuxxjjnsmg058jhjfsupm2qr3',
      pubkey:
        '03b33560989b4b725c247a81f981b1f6d6bbe8261c4950051d2a121d00a485587c',
      PrivateKey:
        'c81a688a01002cd29ec058c419cfc257874253cdac528ae8d440ebde366535a0',
    },
    {
      address: 'cosmos1tv7gumtyj7nyjpsxfqy4qxmzc23dcmr6g44705',
      pubkey:
        '0387057aa4adcd1687037df4e76b7f03462a9ce31dde1f1f6ade1a19451cb7a581',
      PrivateKey:
        '52a5e6739fd7f1dd2b3a087109e1d535677dee566c7ab256a30d58f8649b3f8b',
    },
    {
      address: 'cosmos1fw049y085cmkmeva7j8t7nzs5dww5hn5z0qrjp',
      pubkey:
        '03de97d56afb4f4b1ef42366bd2ae4a7eb9ed211c663978b3e15d4f34d4cbe1448',
      PrivateKey:
        'f7c5008f6b3655bf018cfa83479acd6a35442b394cdb7cfec03a983c51c22759',
    },
    {
      address: 'cosmos1g9zm5jfg7hk2n9ea4y0g4ml049gcqa3na84eqd',
      pubkey:
        '02c964a710b56e114b7f823ed7adf65d29ddbf718c2243aa4320ef6dfc42690e26',
      PrivateKey:
        '1931d172bc22a956e472122b2124c7e3ce4149a6b9585b6d561bcd67205a0ab8',
    },
    {
      address: 'cosmos1s8y374f2chg6m0vl6y757kehqskjsmfw3jm6l4',
      pubkey:
        '02809d44a6110d84b6b430726f0d6287fd17d64bf9190ef3fa8c34cc898b7db0e7',
      PrivateKey:
        'c848487b2e9c9681995052a0e0b07d9ee383a31a74a005ef4e2f79279b1f1d88',
    },
    {
      address: 'cosmos1hrsu0wdp0cjpcc4h46lu5her3n2kxlvzpfkxfp',
      pubkey:
        '0331205d6724f2a4fe62801d15aeb078a111e011153de76ea1d4c6c4f040eaf76f',
      PrivateKey:
        '6374acd998ddce1ac9fb85811d168226b806eaa64cc3baffd224a2e8346f8283',
    },
    {
      address: 'cosmos1e4g55d3sfrmf3udh58xwjsq75h0940q7hsguam',
      pubkey:
        '02372ed252f43124aefee1817322a34629b4eb11ef30abde553a93f79f4f5eafef',
      PrivateKey:
        'da291d774d821a83dd1bdc35f7b1c68abf168180b98c97cd8aa2698b7ee4c14a',
    },
    {
      address: 'cosmos1r7qqxvcgxg6h3r2cg7jd4rutz09v4k0t3ekhtr',
      pubkey:
        '0291efdba0b9be173c3b6cbb8fd83f61257e4bf994e2e1cd0ae66a57360bf2ebe0',
      PrivateKey:
        '8b1396e89634628c0fb882e5595a91fbcb7467822953d8796ecce62d7e6a19ee',
    },
    {
      address: 'cosmos164kmf63qj9288x89ztllyuv8fp2p8h4f4a2vfd',
      pubkey:
        '02147a7df23afd15371e9e3642c9af45e959fa585efa638e3d185ac307edeb17cf',
      PrivateKey:
        '90a8042508f211869fb277be6b5e5974411e6d4d1b9fc7ea8c420f7dbcd4ac4e',
    },
    {
      address: 'cosmos17x6mx2mv6ajymvhlfj98u5e0359gqw6xmwj99z',
      pubkey:
        '03a4117f24a1257285a2c1df844d57e661094f55da6661cc9a102f8100177c51f9',
      PrivateKey:
        '11f86746d3fe6f2f6d845c6da4913ed28cbc0186169561f7aea961c66328ad1a',
    },
    {
      address: 'cosmos1jg5wdftsnw64snelrwwlay7juh9dxh0980h4w0',
      pubkey:
        '02e06bfa53b225030a728f4421d6cf6018ea5aed2fa2045a3304c804ba684c175e',
      PrivateKey:
        '50ce9226321976bf6f771c74eb54adb43a78c10a5411162e3be22aef1856bd98',
    },
    {
      address: 'cosmos1agp7e9thwzctjr7cgdjme9dlj0t92w3fpe7yxf',
      pubkey:
        '0235039d1fd71ac61cfe757643871f0a853a1d23351de0ca7697878de86cdeb34a',
      PrivateKey:
        '61472288383c8cd282c37ba6b7a65d7ce412aac3e25ab08f39e4650366333f64',
    },
    {
      address: 'cosmos19qlgpl3q2vg64z8l8ke3f0p8j64umkqwe075hj',
      pubkey:
        '033e8d9fccd8157896fd9b76a642598bbf3a21f69bd200bda5bb7e8d5608f5f8b9',
      PrivateKey:
        '93c40390cdc2054733c5255c55acddfa067e04af2c051dab6108ef9f9419289c',
    },
    {
      address: 'cosmos13ytarv3m7dvsl36ptxxa2z2jdj5whrpatjenzl',
      pubkey:
        '02526797d7f5a2366fe9798d16507e8e8766b98265f73e207e8ec8d65d0f86a36b',
      PrivateKey:
        'ee530c771a096f31d9682f3f1396358941b2db5d35d94fed7a2d177041654284',
    },
    {
      address: 'cosmos158xeymglu3wnysrc76ysxvhqxaqaea8mhq4ul4',
      pubkey:
        '026f8e41f3dfab19caaea587a388e05450f586100770905dfe5f4ab46b9b46b98b',
      PrivateKey:
        '2df832ff2f7546b4f3f27d639a2441a2e40893e88a7d7541f4f3ab991d4007a1',
    },
    {
      address: 'cosmos1klmupe8deeu64n42t8gqun29z48l3ethh53q47',
      pubkey:
        '0378d82c40f51bf6944dec7d5ab2aa0b2b58b22d2becb27dbc09ec4876e37d49e3',
      PrivateKey:
        '49151be70cf512cfa6ed9f31a03585d72f9c18e0fd9cd00e90538852e09571d0',
    },
    {
      address: 'cosmos16a8lm7tflk3jgsntae32aqevsps4pqvw54acj5',
      pubkey:
        '02353bf76c49d38553130c1febf305f07a73438e916708db18af85920482e45981',
      PrivateKey:
        'd8ef5153b43741bc878beaaa9ff85a723ec8470f0fd2ed5fc5b4300388d6ca7e',
    },
    {
      address: 'cosmos1vpwtcg002s8r3smhp2as39hq492d3cnewzc6mx',
      pubkey:
        '02ba251745bbc1ea8843764b0bebbd79b11f8f5dc263629677ed4d0ceb08e03b60',
      PrivateKey:
        '67dce80c6c86ea7b7b02cfce94cb37dde41e8e74888dbfd179a09b6a9b64ad2b',
    },
    {
      address: 'cosmos1xurssjymwe5e9mlrxjg8s54ny5nqfq60ec00c3',
      pubkey:
        '03a97987f8fc1c1e0040f61c1ebaaa9173735a9f6f147aec31981a5ccc1f05667b',
      PrivateKey:
        '87b589157a9c4ebb086e06bfb42ae307ee73e75f45cacfd2c42826abe627b946',
    },
    {
      address: 'cosmos1zvzh93x5ae6x5ka7my5nul3qc6quqmurg2wzja',
      pubkey:
        '0301f5eaa5e15259d770732e7b1ae3c4f52b830d18b502be9b11630a414b28976e',
      PrivateKey:
        'fdd1bbff6a9b1a500c01f96e8cc86cc5558ce013d99303c79879d5d0e4c7b469',
    },
    {
      address: 'cosmos1pztpxrukk5fjdmetx0jw9fflym9q9e7e70h3yk',
      pubkey:
        '03e5adc026dbb4bc3276e4440f18cb02b7a481654eb622b2f102625ab3eb06bbb5',
      PrivateKey:
        '1b5f5cbf9a0d9b66fea7fb12f785b3fab47903ed55abf7e8b3ffbf2adae66284',
    },
    {
      address: 'cosmos1e5n009e4d8mz4hmfuekyhlq0e74kncll4d5w36',
      pubkey:
        '0319ed6c3f9bcf0afc3269877ff01ac1c102b52566522d62c15d6471ce28985eeb',
      PrivateKey:
        'f4b67fd6f230dfbacaad31e9bcc86bf22e5ecc9ca6a0edfb817757591bbae7a1',
    },
    {
      address: 'cosmos1w66xduuhaf9e8vfrn75j6n5r7cu9m4wxl2wssd',
      pubkey:
        '02ae84360b5bceb90423f91551149f346d318a7db2171365d46f6248c9336a10df',
      PrivateKey:
        '70810ee6ca4b7fbf3af5cd77ede0a0d6517eefd562cd7dcba3df1a4cc2c99007',
    },
    {
      address: 'cosmos1zcrsh38jck5268ykjj9lhummz92zavqm49nfgp',
      pubkey:
        '0216a61d0b546337fbefd6e1eb314c7e0015c2b57ab9c266d0b51075881394d182',
      PrivateKey:
        '3a910131e29bb272adbf26294300f0b651f261f33f39d2fcfd2a857e8b5e2727',
    },
    {
      address: 'cosmos1xfcd2padh7mgzfv5qssuxnr89f050apm77ycqp',
      pubkey:
        '02ef0b43186aa68dcf6b28a8294f9fb6712b512ff0d62fc689d0678ed79009c793',
      PrivateKey:
        'a92b2e493eab6eca04b84494e6385e1ba6bb7acf6b30bc312841c1974aab1225',
    },
    {
      address: 'cosmos187tzjdzmex5d3kt9tcr5pl9fpxguw84ywjwr64',
      pubkey:
        '02200a6b32269fb474815e7194d9a681b0300cea9532b9eecda588712b6a7538a2',
      PrivateKey:
        'c2a4caa8b11d1bc0d7a6c1a1e8f5b06c8346f9ee449194808c0ab9706fcb0a3a',
    },
    {
      address: 'cosmos1c3cd9h347ysk5ry8xscpk27eqrzkzxyd3ph06r',
      pubkey:
        '0301e1781e0465c0bcfe4f8eeef34387940f1bc7a15be385d9832a72dc7bd3bf4d',
      PrivateKey:
        'c6210e9e0338b5328d201b941c0dfb5f663161c6a9a435d068dcf64ade0782db',
    },
    {
      address: 'cosmos17urqt3m95860pxu2p45gf3r73tuc4zla88lkps',
      pubkey:
        '02ac7a45bdb71acb8113e1bff9b3e6ff52e6b16d1082de63d9203701a778362b17',
      PrivateKey:
        '1eea50be57865dc57cc89f8dcb926262bda47e0f64c4e29ebb7c7d18b774c40f',
    },
    {
      address: 'cosmos1ktrg77s7qwdm9zt99ey087n2wuje8zph9ks9e0',
      pubkey:
        '03a5beb83191b6b986b5c48baa221de8135d0c8eb5ff6a1b9e1114f3e2f94129d2',
      PrivateKey:
        '3cefeafc854a85ce103dbe16cc8e97ae1240f63c1f67bb5a9e14bc04a20d7766',
    },
    {
      address: 'cosmos1zve97eq6qm8dqdg5r0q9a6uvzqz5mk60alx99t',
      pubkey:
        '0383ad6273ed02b12f9a05711c0bf575e47731e996656ffb4b809cc7f50041779c',
      PrivateKey:
        'f6fc5a2904c1ba86af0c063d7f36e26e9f979c5bc6f159f07e0b24c9a17b92a9',
    },
    {
      address: 'cosmos1s73k66c88vwu38fkawuudt94yaxjtnsrwpj6xn',
      pubkey:
        '036dfaafe5d56b34b53f9ccee73e6f984ef3640e6ba9ce397c309370a14118f3b1',
      PrivateKey:
        '2a1da6cef4984bfe27bdde18fa4d75839a62a173417d6662846d82f277483a11',
    },
    {
      address: 'cosmos107hmekx24rzlnw4pc2nhkvkawe5qk0qffn0zc3',
      pubkey:
        '0282ca649506a151a98e9c51d479c90aa165a51edf5dea43af20602e8430495cff',
      PrivateKey:
        '1587a55b019ddcb99deeb73466f4362fbd2ec3143a3a9cd524b923e91db6e0d4',
    },
    {
      address: 'cosmos1augx47m5tsyvjthew5v8qvjh6nmyz5uqterd72',
      pubkey:
        '02250a179dceb76b504b92ee076fbc8470753a6b924ae224a1704a43ebef6f9aca',
      PrivateKey:
        '4af4fc216e7e45dd5e7b04bfc8ea21f5c689f7766c31176784623bfc212c6ffa',
    },
    {
      address: 'cosmos18x6da9azu8p0q7hujs3tad6kgvkxna4ydqsvce',
      pubkey:
        '025beb48dd9fcbeec9a57c1c44a3721b7ac3186b3d3bd02d895b914fe7c2feafe6',
      PrivateKey:
        '26e3fd989fb6ff0d8544b3556bfd7605f9ba04b5e76035dad80c1a091ce9d102',
    },
    {
      address: 'cosmos1dc8tz43mq8ug6weyvn2rq3339g2vkpg2zwh46m',
      pubkey:
        '02c0c4121acee659f5b734da8b61e644fc7d314132b785bb840631d3d8eb40d359',
      PrivateKey:
        '29e3936ac223dc5043ac6a92e818000071d4c8400f408b9fc6698fbb9d9c4824',
    },
    {
      address: 'cosmos1evllpgef8s5gtvtjfru57wvm78svljycljthjp',
      pubkey:
        '02fb8cfa6b4772edc5193636522e0e0157c346433affa1ddd35b043fd6a6f53703',
      PrivateKey:
        '9337619bac301c4740f33ed8f5ebea6e31d8be9f3c859855b12e546b4b4303b5',
    },
    {
      address: 'cosmos1zslfnlpw59ylnz2fsfy3wu5j535v27f88zejxu',
      pubkey:
        '029a80d9b58267750c66de14e62f8ba75b7c565f74c650b2535ecbe4644dd0311e',
      PrivateKey:
        'de07dca5293ef271045ea08e1257639d02babde2666f851229b822771787cd7f',
    },
    {
      address: 'cosmos1dg30davglzjlle978z0gt3s0vhqshy2wxragcn',
      pubkey:
        '02985dc469623e60df38dc9b8f4ed273a5d576eb62bd14c62f4d12fa643b16fb7b',
      PrivateKey:
        '9d9ee3677a14c55b4783836e818bb5d30dde592ed530b40cbb34703a8f54e20f',
    },
    {
      address: 'cosmos19d8fj24qqrqalcgs5zzexytxxnhxc3qntyettt',
      pubkey:
        '0309719c51bbbb05824b33b23ad05bc09497eafc621c09470dc72ec9e593b17612',
      PrivateKey:
        '18319981ac75f1b3bb46daafd53ec72bef986192a49828a8f5abaf378b3cb1c0',
    },
    {
      address: 'cosmos1l69lragq0v9k5a6e0hkelekmfjg80avvvjenlc',
      pubkey:
        '03ef02f4a5c9cc18d4df3643e92b29230e3c11cb4ee2fb562fc5bb9022b7019f0c',
      PrivateKey:
        '317f796c199e2f727d4c1ffbe429279e6546601857d25bdc18343ec22aebcec1',
    },
    {
      address: 'cosmos1tsyag7336s3fzztpc5gc5sgm57f9tcdv4pypd9',
      pubkey:
        '02887bed042cc3f7adb820363d978e70ee1b7c599764838bdf16c2f1bc6c04fa92',
      PrivateKey:
        'a70f17c9fa80f61ba5eadce882e9dd60e48821f4a2ae46c4b59d9317e332204c',
    },
    {
      address: 'cosmos19nzhnhxy63u0wl4ypvk6esmjem5mne4w45khdu',
      pubkey:
        '02867b223a08991a09834d91c98b5f96ae350251feaa8ad9e6b9ebc365dcc9575f',
      PrivateKey:
        '42eee2eab9850e324ef50061be2e4c429616457a0f90e0de840ee2be65ee53ba',
    },
    {
      address: 'cosmos1tc8f3cha2knxdjw9z4nu45efh2vl25770uxq3r',
      pubkey:
        '02f8df21da9ba44994f6ab07e005a32666c4041bc7cd1a7aaa2b0936141e6cdb4d',
      PrivateKey:
        'b1d5ae8f7b72804107337ae523c7601733227ad52a757ef9b9293a145a43b91b',
    },
    {
      address: 'cosmos1ynnvz4kukjulxvwyvu55chntjkqc06hv5w2qcg',
      pubkey:
        '029ac8966970c978a583b77deff73211dbaf063206286b2ef2eab80d24b6ac3021',
      PrivateKey:
        'ef4bedbf35813e4ae7577cf775a2db5a3222ef88831d7d008556cca72096ff17',
    },
    {
      address: 'cosmos1qe87y3d8qrdzm7wfygym2pszae5x0h52e3dffh',
      pubkey:
        '039b98d52bb14d07fa83b8cec9f267a4a6ebbcc47ca8cd7de48044da55cef934be',
      PrivateKey:
        '631b85c206ec5f1de05163fb3f0e011bd0e8f3343c8aed92d7a62b5e865d6aed',
    },
    {
      address: 'cosmos1xyknnr4jd4xwewqzsma93fntw8jdkrwmd0egsf',
      pubkey:
        '03a422b5135c1da55e875f38b784a8a6ae2974840e939ec5be99655946170c83bc',
      PrivateKey:
        '8febd120afaac5a5a3e5f63ea428ef954d4cd371c12c23283c6dd4f6ebfeae6c',
    },
    {
      address: 'cosmos16y8s9cfenxaywsa6fk5ja0r8yq3vezdfyl9r47',
      pubkey:
        '03d7a03ccb10f31019bca252ca4e026501a7a0c63e400fe22630e09410a86849f9',
      PrivateKey:
        'cff0017c801c88f28e1d6380f45078c19f6002d27ee408c9da87dfc750804d2b',
    },
    {
      address: 'cosmos1cu5ajal3kddmx0fjlncs7cl44hf64hdszx8zud',
      pubkey:
        '032556ee4a636e506a8211b7467fb4364ddb4ebf0e546277f2e81add45854766a2',
      PrivateKey:
        '97259a9fc586c2fc9d6585c50ae59dc3dab42dc6d3111a274b08bef77bf97612',
    },
    {
      address: 'cosmos19aszdg8k6pt228qzapezdd33a8erynxclvf6vd',
      pubkey:
        '032abc0a648f1d7ab1b83e75a005471e4db03ac9de2c1442d637f0fd78d2989cad',
      PrivateKey:
        'b62026764efc016e3cc22d5b1293c59c9a3625f88c0fc4e1c08ca382b1085ace',
    },
    {
      address: 'cosmos14dh9gnhk76tkv30augyyh3gfx4rt95xelssd0s',
      pubkey:
        '0289dd4620d7e5470cdfbac51e521ea8e7513c7daccf4302b6ba8f0b269e9ef8ad',
      PrivateKey:
        '6becde733a46fb2bbb22b0985a5cf559c8ff87d629d283911978d5afdf76da43',
    },
    {
      address: 'cosmos19rjkp0sv42kyda90x8eppadthzghn69nl3qy0z',
      pubkey:
        '03e21a8a07ed56c39f8efde40ae270ae3e726d685c78941e27355b1338a0e1b6ac',
      PrivateKey:
        '8b135cdbaf0152efb8e603382515ebb57085dab21317bdca861aa62f87c680e6',
    },
    {
      address: 'cosmos16gm6p3x6u0nczurqhzvjjzzh5cj89ndk68n8n5',
      pubkey:
        '033687a5c6f9edacec4f360e774e053656cccb81b8317bc0e36eb9debd7f79357c',
      PrivateKey:
        '76a6b2b30347b5e3186f87b46f51afb742abb7e4324e7a42907139193b9c46ba',
    },
    {
      address: 'cosmos1z9428nfhq4pqsqmk6fa36h7ququ7u0378qsfga',
      pubkey:
        '03e75519e1e0f8e8c7ee9580de72f6f0abe286707b583f093781876ecfcbe06bb8',
      PrivateKey:
        'c6a0654c1ef6faa6a59ddb78406888a9ec8e74d98bf6b25858f91e40c8da6261',
    },
    {
      address: 'cosmos1lv40puuykhn77va5t8w5h6pqwc829yt3eghewf',
      pubkey:
        '03447b107b27bb2fe67d3123a7428d7dd5b9dd3314dfaa3fa2209ef7581ecd7417',
      PrivateKey:
        'f5077b51534f35ef6a90f79560f4478bf37d1364e5a4f54c5ef5fddacdbc9012',
    },
    {
      address: 'cosmos12udj0x7kr8tydgxteq75nrrkhcds3ng969sj4v',
      pubkey:
        '03d064e58af65fa1157786b1d45bac73c8896869a72931353b8c89e0799b822a78',
      PrivateKey:
        '59786d158ed520c7ddeed5a7b08f3ccbc043a4b9bf190ca50b3b2f30fa6d9419',
    },
    {
      address: 'cosmos1zvjuutgcfz7agskg675g70xgu4lrj35uuwydkd',
      pubkey:
        '027e1ee46c2798710e74777f5978dc2a6c89cbcf4f94fb41b8f556b3bb43194fc7',
      PrivateKey:
        '1d2fa2e08974df13e8bbd608faec3d7cc3ee722e2f55d59e5459318a7a2d050f',
    },
    {
      address: 'cosmos1ll6sx40ef6chytqupym60837vsjjhchwa6du9r',
      pubkey:
        '023110638f2bc7116dab303c3ff370c8708fb2960d1c1954f9116f952ac492675b',
      PrivateKey:
        '364a66d838ea6d9279af25462132c2f122eb6887db2c4d57f63def33a9a06cb9',
    },
    {
      address: 'cosmos1gmlxcmu686c2e9uhqhnw8l6furssehmeg8yjeu',
      pubkey:
        '0279b6853942e76f57bfa5caef057a6d36c56d8dc548d7eae18f974bb46be93dae',
      PrivateKey:
        '4e66314727b2f58b645c2c6a1c708cbdd5d2f356d48481ada037be7eaa2693f5',
    },
    {
      address: 'cosmos1c7jlq3tyqqwh24uzzxmsf85lmz2uahwy3j4uw0',
      pubkey:
        '03ded70fde616585fa333377e0b16ef0b00421f1dc7901732458697f9deafe3634',
      PrivateKey:
        'e0707e56d69516e7832561e5ac742a6838f782dd85ec051c883580bc85457e87',
    },
    {
      address: 'cosmos1ptc08xga3cz8dlt20f69w2z2czjqssukqsygs6',
      pubkey:
        '03ab55558c0897df223e1cd7ebf822f1c482760a42436b3da66a2a40cc3d09d6fc',
      PrivateKey:
        'b3b04850a3d184b12814b71fcf22a613d15715c655cb7ea2d8ac98e5a4526d19',
    },
    {
      address: 'cosmos1a4rlr8l7u7p7ka4xkyaf9sa2t0hssu6khqv084',
      pubkey:
        '021b7afa756b92293d204c9a9c7a08530164cc1ae85e4ac6f9d87992310dfeaa25',
      PrivateKey:
        'adea94375965ab34d0a0d7e90c030f8ad9176d7b12958b4b8034f0cc1b1be517',
    },
    {
      address: 'cosmos1yyun30vu3ajuman8a5au9zdrzrsv8959tes73j',
      pubkey:
        '03061cf649d42e24290e095985e44ca138597e5763b8360916afe6d461b09c090e',
      PrivateKey:
        '6f3b161feded2bd8e98cbb5339e0e1362594129efef5abf35f2f41b9f3decb0a',
    },
    {
      address: 'cosmos1rlhkr2mcjunpwdyltque5kctn4upct0398uqa6',
      pubkey:
        '0259a642daacbcacefb68624077875ec111e6000dd8bfea79d4ccc1ba9ac78a5c6',
      PrivateKey:
        '3817ccdae06e6afea3fe9b06a0e1ec54d0b36caa441002b359fb5eb3c0832676',
    },
    {
      address: 'cosmos1x28qcvcqlejv63ez7hd97e05xn3ckcfj8e9sa7',
      pubkey:
        '038399888e8b2a416f1b7248b1ab45925435e9ccefad781f264d89614adb1a2474',
      PrivateKey:
        '2a419b4676fac4cf511325a98b329d85433e9785c902f44950fdca04cf917b99',
    },
  ].map(getAddressData),
};

export { getAddressData };
export default TestWallets;
